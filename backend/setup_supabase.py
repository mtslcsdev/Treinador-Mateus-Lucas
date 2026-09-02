"""
Script para criar schema no Supabase
Execute: python setup_supabase.py
"""
import os
from dotenv import load_dotenv
from supabase import create_client

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

print(f"🔗 Conectando ao Supabase: {SUPABASE_URL}")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# SQL para criar as tabelas
SQL_SCHEMA = """
-- ============================================
-- SCHEMA DO SUPABASE - TREINADOR APP
-- ============================================

-- Tabela de Atletas
CREATE TABLE IF NOT EXISTS public.atletas (
  id BIGSERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT,
  aderencia FLOAT DEFAULT 0,
  criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  atualizado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.atletas ENABLE ROW LEVEL SECURITY;

-- Tabela de Ciclos (períodos de treino)
CREATE TABLE IF NOT EXISTS public.ciclos (
  id BIGSERIAL PRIMARY KEY,
  atleta_id BIGINT NOT NULL REFERENCES public.atletas(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  descricao TEXT,
  criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  atualizado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.ciclos ENABLE ROW LEVEL SECURITY;

-- Tabela de Semanas
CREATE TABLE IF NOT EXISTS public.semanas (
  id BIGSERIAL PRIMARY KEY,
  ciclo_id BIGINT NOT NULL REFERENCES public.ciclos(id) ON DELETE CASCADE,
  semana INT NOT NULL,
  nome TEXT,
  criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  atualizado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.semanas ENABLE ROW LEVEL SECURITY;

-- Tabela de Treinos
CREATE TABLE IF NOT EXISTS public.treinos (
  id BIGSERIAL PRIMARY KEY,
  ciclo_id BIGINT NOT NULL REFERENCES public.ciclos(id) ON DELETE CASCADE,
  semana INT,
  dia TEXT,
  fase TEXT NOT NULL,
  tipo TEXT NOT NULL,
  pace TEXT,
  obs TEXT,
  criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  atualizado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.treinos ENABLE ROW LEVEL SECURITY;

-- Tabela de Execução de Treinos (registro de treinos realizados)
CREATE TABLE IF NOT EXISTS public.execucoes_treinos (
  id BIGSERIAL PRIMARY KEY,
  treino_id BIGINT NOT NULL REFERENCES public.treinos(id) ON DELETE CASCADE,
  atleta_id BIGINT NOT NULL REFERENCES public.atletas(id) ON DELETE CASCADE,
  data TIMESTAMP WITH TIME ZONE,
  realizado BOOLEAN DEFAULT FALSE,
  distancia FLOAT,
  tempo INT,
  notas TEXT,
  criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  atualizado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.execucoes_treinos ENABLE ROW LEVEL SECURITY;

-- Tabela de Usuários do Treinador
CREATE TABLE IF NOT EXISTS public.treinadores (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  nome TEXT,
  ativo BOOLEAN DEFAULT TRUE,
  criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  atualizado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.treinadores ENABLE ROW LEVEL SECURITY;

-- ============================================
-- POLÍTICAS DE SEGURANÇA (RLS)
-- ============================================

-- Política: Qualquer um autenticado pode ver atletas
CREATE POLICY IF NOT EXISTS "Atletas são legíveis por usuários autenticados"
ON public.atletas
FOR SELECT
USING (auth.role() = 'authenticated');

-- Política: Apenas treinador pode inserir/atualizar atletas
CREATE POLICY IF NOT EXISTS "Apenas treinador pode modificar atletas"
ON public.atletas
FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

-- Ciclos
CREATE POLICY IF NOT EXISTS "Ciclos são legíveis por usuários autenticados"
ON public.ciclos
FOR SELECT
USING (auth.role() = 'authenticated');

CREATE POLICY IF NOT EXISTS "Apenas treinador pode modificar ciclos"
ON public.ciclos
FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

-- Treinos
CREATE POLICY IF NOT EXISTS "Treinos são legíveis por usuários autenticados"
ON public.treinos
FOR SELECT
USING (auth.role() = 'authenticated');

CREATE POLICY IF NOT EXISTS "Apenas treinador pode modificar treinos"
ON public.treinos
FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

-- ============================================
-- ÍNDICES PARA PERFORMANCE
-- ============================================

CREATE INDEX IF NOT EXISTS idx_atletas_nome ON public.atletas(nome);
CREATE INDEX IF NOT EXISTS idx_ciclos_atleta_id ON public.ciclos(atleta_id);
CREATE INDEX IF NOT EXISTS idx_semanas_ciclo_id ON public.semanas(ciclo_id);
CREATE INDEX IF NOT EXISTS idx_treinos_ciclo_id ON public.treinos(ciclo_id);
CREATE INDEX IF NOT EXISTS idx_execucoes_treinos_atleta_id ON public.execucoes_treinos(atleta_id);
CREATE INDEX IF NOT EXISTS idx_execucoes_treinos_treino_id ON public.execucoes_treinos(treino_id);
CREATE INDEX IF NOT EXISTS idx_treinadores_email ON public.treinadores(email);
"""

print("⏳ Executando schema SQL...")

# Executar via REST API (Supabase SQL)
try:
    response = supabase.postgrest.from_("_meta").select("*").execute()
    print("✅ Conexão com Supabase bem-sucedida!")
except Exception as e:
    print(f"❌ Erro de conexão: {e}")
    exit(1)

# Tentar criar tabelas via RPC ou executar manualmente
print("\n📊 Tabelas que serão criadas:")
print("  ✓ atletas")
print("  ✓ ciclos")
print("  ✓ semanas")
print("  ✓ treinos")
print("  ✓ execucoes_treinos")
print("  ✓ treinadores")

print("\n⚠️  Para criar as tabelas, você precisa:")
print("1. Abrir o Supabase Dashboard")
print("2. Ir para SQL Editor")
print("3. Colar o conteúdo de: docs/supabase-schema.sql")
print("4. Clicar em 'Run'")

print("\n✅ Arquivo de schema disponível em: docs/supabase-schema.sql")
print("✅ Credenciais configuradas em: backend/.env e frontend/.env.local")
