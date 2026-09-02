"""
Script para criar todas as tabelas no Supabase via Python
Execute: python create_tables.py
"""
import os
from dotenv import load_dotenv
import httpx

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

print("=" * 70)
print("🗄️  CRIANDO TABELAS NO SUPABASE")
print("=" * 70)

# SQL para criar as tabelas
CREATE_TABLES_SQL = """
-- Tabela de Atletas
CREATE TABLE IF NOT EXISTS public.atletas (
  id BIGSERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT,
  aderencia FLOAT DEFAULT 0,
  criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  atualizado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Ciclos
CREATE TABLE IF NOT EXISTS public.ciclos (
  id BIGSERIAL PRIMARY KEY,
  atleta_id BIGINT NOT NULL REFERENCES public.atletas(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  descricao TEXT,
  criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  atualizado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

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

-- Habilitar RLS
ALTER TABLE public.atletas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ciclos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.treinos ENABLE ROW LEVEL SECURITY;

-- Índices
CREATE INDEX IF NOT EXISTS idx_atletas_nome ON public.atletas(nome);
CREATE INDEX IF NOT EXISTS idx_ciclos_atleta_id ON public.ciclos(atleta_id);
CREATE INDEX IF NOT EXISTS idx_treinos_ciclo_id ON public.treinos(ciclo_id);
"""

# Usar Supabase Python SDK
try:
    from supabase import create_client
    
    print(f"\n🔗 Conectando a: {SUPABASE_URL}")
    supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
    
    # Criar tabela atletas
    print("\n📝 Criando tabela: atletas...")
    try:
        supabase.table('atletas').select('id').limit(1).execute()
        print("  ✓ Tabela 'atletas' já existe")
    except:
        # Tabela não existe, então vamos criar
        print("  ⏳ Criando tabela...")
        # Supabase Python SDK não tem suporte a raw SQL, precisamos fazer manualmente
        print("  ⚠️  Necessário executar SQL manualmente")
    
    # Criar tabela ciclos
    print("\n📝 Criando tabela: ciclos...")
    try:
        supabase.table('ciclos').select('id').limit(1).execute()
        print("  ✓ Tabela 'ciclos' já existe")
    except:
        print("  ⚠️  Necessário executar SQL manualmente")
    
    # Criar tabela treinos
    print("\n📝 Criando tabela: treinos...")
    try:
        supabase.table('treinos').select('id').limit(1).execute()
        print("  ✓ Tabela 'treinos' já existe")
    except:
        print("  ⚠️  Necessário executar SQL manualmente")
    
    print("\n" + "=" * 70)
    print("📋 INSTRUÇÕES PARA CRIAR AS TABELAS")
    print("=" * 70)
    print("""
1. Abra seu dashboard Supabase:
   https://supabase.com/dashboard

2. Selecione seu projeto (treinador-app)

3. Vá para "SQL Editor" no menu esquerdo

4. Clique em "New Query"

5. Cole este SQL e execute:
""")
    print(CREATE_TABLES_SQL)
    
    print("\n" + "=" * 70)
    print("✅ Após criar as tabelas, você poderá:")
    print("  - Rodar o backend: uvicorn app.main:app --reload")
    print("  - Rodar o frontend: npm run dev")
    print("=" * 70)
    
except ImportError:
    print("❌ Erro: supabase não foi importado")
    print("Instale: pip install supabase")

except Exception as e:
    print(f"\n❌ Erro: {str(e)}")
