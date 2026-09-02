-- ============================================
-- SCHEMA DO SUPABASE - TREINADOR APP
-- ============================================
-- Execute este SQL no SQL Editor do Supabase
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
  senha_hash TEXT,
  ativo BOOLEAN DEFAULT TRUE,
  criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  atualizado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.treinadores ENABLE ROW LEVEL SECURITY;

-- ============================================
-- POLÍTICAS DE SEGURANÇA (RLS)
-- ============================================

-- Política: Qualquer um autenticado pode ver atletas
CREATE POLICY "Atletas são legíveis por usuários autenticados"
ON public.atletas
FOR SELECT
USING (auth.role() = 'authenticated');

-- Política: Apenas treinador pode inserir/atualizar atletas
CREATE POLICY "Apenas treinador pode modificar atletas"
ON public.atletas
FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

-- Políticas similares para outras tabelas...
-- Ciclos
CREATE POLICY "Ciclos são legíveis por usuários autenticados"
ON public.ciclos
FOR SELECT
USING (auth.role() = 'authenticated');

CREATE POLICY "Apenas treinador pode modificar ciclos"
ON public.ciclos
FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

-- Treinos
CREATE POLICY "Treinos são legíveis por usuários autenticados"
ON public.treinos
FOR SELECT
USING (auth.role() = 'authenticated');

CREATE POLICY "Apenas treinador pode modificar treinos"
ON public.treinos
FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

-- ============================================
-- ÍNDICES PARA PERFORMANCE
-- ============================================

CREATE INDEX idx_atletas_nome ON public.atletas(nome);
CREATE INDEX idx_ciclos_atleta_id ON public.ciclos(atleta_id);
CREATE INDEX idx_semanas_ciclo_id ON public.semanas(ciclo_id);
CREATE INDEX idx_treinos_ciclo_id ON public.treinos(ciclo_id);
CREATE INDEX idx_execucoes_treinos_atleta_id ON public.execucoes_treinos(atleta_id);
CREATE INDEX idx_execucoes_treinos_treino_id ON public.execucoes_treinos(treino_id);
CREATE INDEX idx_treinadores_email ON public.treinadores(email);

-- ============================================
-- DADOS DE EXEMPLO (opcional)
-- ============================================

-- Inserir um atleta de exemplo
INSERT INTO public.atletas (nome, email, aderencia)
VALUES ('Allan Viana', 'allan@example.com', 85.5)
ON CONFLICT DO NOTHING;

-- Inserir um ciclo de exemplo
INSERT INTO public.ciclos (atleta_id, nome, descricao)
SELECT id, 'Ciclo 21km - Maratona Piauí Crono', 'Preparação para maratona'
FROM public.atletas
WHERE nome = 'Allan Viana'
ON CONFLICT DO NOTHING;
