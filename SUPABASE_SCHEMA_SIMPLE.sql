-- ============= SCHEMA SUPABASE - ATLETAS E CICLOS =============
-- Execute esse script completo no SQL Editor do Supabase

-- 1. TABELA DE ATLETAS
CREATE TABLE IF NOT EXISTS public.atletas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  nome TEXT NOT NULL,
  email TEXT,
  notas TEXT,
  historicoPaces JSONB DEFAULT '[]'::jsonb,
  aderencia INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 2. TABELA DE CICLOS
CREATE TABLE IF NOT EXISTS public.ciclos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  atleta_id UUID NOT NULL REFERENCES public.atletas(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  prova JSONB,
  semanas JSONB DEFAULT '[]'::jsonb,
  is_template BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 3. TABELA DE NOTAS
CREATE TABLE IF NOT EXISTS public.notas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  atleta_id UUID NOT NULL REFERENCES public.atletas(id) ON DELETE CASCADE,
  ciclo_id UUID REFERENCES public.ciclos(id) ON DELETE SET NULL,
  data DATE NOT NULL,
  conteudo TEXT NOT NULL,
  tipo TEXT DEFAULT 'geral'::text,
  tags JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 4. TABELA DE TESTES PERIÓDICOS
CREATE TABLE IF NOT EXISTS public.testes_periodicos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  atleta_id UUID NOT NULL REFERENCES public.atletas(id) ON DELETE CASCADE,
  tipo TEXT NOT NULL,
  data DATE NOT NULL,
  resultado JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- ============= INDEXES =============
CREATE INDEX IF NOT EXISTS idx_atletas_user_id ON public.atletas(user_id);
CREATE INDEX IF NOT EXISTS idx_atletas_nome ON public.atletas(nome);
CREATE INDEX IF NOT EXISTS idx_ciclos_atleta_id ON public.ciclos(atleta_id);
CREATE INDEX IF NOT EXISTS idx_ciclos_is_template ON public.ciclos(is_template);
CREATE INDEX IF NOT EXISTS idx_notas_atleta_id ON public.notas(atleta_id);
CREATE INDEX IF NOT EXISTS idx_notas_ciclo_id ON public.notas(ciclo_id);
CREATE INDEX IF NOT EXISTS idx_notas_data ON public.notas(data);
CREATE INDEX IF NOT EXISTS idx_testes_atleta_id ON public.testes_periodicos(atleta_id);
CREATE INDEX IF NOT EXISTS idx_testes_data ON public.testes_periodicos(data);

-- ============= ROW LEVEL SECURITY =============

-- Habilitar RLS
ALTER TABLE public.atletas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ciclos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testes_periodicos ENABLE ROW LEVEL SECURITY;

-- ============= POLICIES ATLETAS =============
CREATE POLICY "atletas_select" ON public.atletas
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "atletas_insert" ON public.atletas
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "atletas_update" ON public.atletas
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "atletas_delete" ON public.atletas
  FOR DELETE USING (auth.uid() = user_id);

-- ============= POLICIES CICLOS =============
CREATE POLICY "ciclos_select" ON public.ciclos
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.atletas
      WHERE public.atletas.id = public.ciclos.atleta_id
      AND public.atletas.user_id = auth.uid()
    )
  );

CREATE POLICY "ciclos_insert" ON public.ciclos
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.atletas
      WHERE public.atletas.id = atleta_id
      AND public.atletas.user_id = auth.uid()
    )
  );

CREATE POLICY "ciclos_update" ON public.ciclos
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.atletas
      WHERE public.atletas.id = public.ciclos.atleta_id
      AND public.atletas.user_id = auth.uid()
    )
  );

CREATE POLICY "ciclos_delete" ON public.ciclos
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.atletas
      WHERE public.atletas.id = public.ciclos.atleta_id
      AND public.atletas.user_id = auth.uid()
    )
  );

-- ============= POLICIES NOTAS =============
CREATE POLICY "notas_select" ON public.notas
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.atletas
      WHERE public.atletas.id = public.notas.atleta_id
      AND public.atletas.user_id = auth.uid()
    )
  );

CREATE POLICY "notas_insert" ON public.notas
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.atletas
      WHERE public.atletas.id = atleta_id
      AND public.atletas.user_id = auth.uid()
    )
  );

CREATE POLICY "notas_update" ON public.notas
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.atletas
      WHERE public.atletas.id = public.notas.atleta_id
      AND public.atletas.user_id = auth.uid()
    )
  );

CREATE POLICY "notas_delete" ON public.notas
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.atletas
      WHERE public.atletas.id = public.notas.atleta_id
      AND public.atletas.user_id = auth.uid()
    )
  );

-- ============= POLICIES TESTES =============
CREATE POLICY "testes_select" ON public.testes_periodicos
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.atletas
      WHERE public.atletas.id = public.testes_periodicos.atleta_id
      AND public.atletas.user_id = auth.uid()
    )
  );

CREATE POLICY "testes_insert" ON public.testes_periodicos
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.atletas
      WHERE public.atletas.id = atleta_id
      AND public.atletas.user_id = auth.uid()
    )
  );

CREATE POLICY "testes_update" ON public.testes_periodicos
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.atletas
      WHERE public.atletas.id = public.testes_periodicos.atleta_id
      AND public.atletas.user_id = auth.uid()
    )
  );

CREATE POLICY "testes_delete" ON public.testes_periodicos
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.atletas
      WHERE public.atletas.id = public.testes_periodicos.atleta_id
      AND public.atletas.user_id = auth.uid()
    )
  );

-- ============= FIM DO SCHEMA =============
-- Agora você pode usar o app!
-- As tabelas estão prontas com RLS habilitado
