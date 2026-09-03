-- ============= TABELA DE ATLETAS =============
CREATE TABLE IF NOT EXISTS public.atletas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  nome TEXT NOT NULL,
  email TEXT,
  notas TEXT,
  historicoPaces JSONB DEFAULT '[]',
  aderencia INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Index para queries de user_id
CREATE INDEX IF NOT EXISTS idx_atletas_user_id ON public.atletas(user_id);
CREATE INDEX IF NOT EXISTS idx_atletas_nome ON public.atletas(nome);

-- ============= TABELA DE CICLOS =============
CREATE TABLE IF NOT EXISTS public.ciclos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  atleta_id UUID NOT NULL REFERENCES public.atletas(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  prova JSONB,
  semanas JSONB NOT NULL DEFAULT '[]',
  is_template BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Indexes para queries de ciclos
CREATE INDEX IF NOT EXISTS idx_ciclos_atleta_id ON public.ciclos(atleta_id);
CREATE INDEX IF NOT EXISTS idx_ciclos_is_template ON public.ciclos(is_template);

-- ============= TABELA DE NOTAS =============
CREATE TABLE IF NOT EXISTS public.notas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  atleta_id UUID NOT NULL REFERENCES public.atletas(id) ON DELETE CASCADE,
  ciclo_id UUID REFERENCES public.ciclos(id) ON DELETE SET NULL,
  data DATE NOT NULL,
  conteudo TEXT NOT NULL,
  tipo TEXT DEFAULT 'geral',
  tags JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_notas_atleta_id ON public.notas(atleta_id);
CREATE INDEX IF NOT EXISTS idx_notas_ciclo_id ON public.notas(ciclo_id);
CREATE INDEX IF NOT EXISTS idx_notas_data ON public.notas(data);

-- ============= TABELA DE TESTES PERIÓDICOS =============
CREATE TABLE IF NOT EXISTS public.testes_periodicos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  atleta_id UUID NOT NULL REFERENCES public.atletas(id) ON DELETE CASCADE,
  tipo TEXT NOT NULL,
  data DATE NOT NULL,
  resultado JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_testes_atleta_id ON public.testes_periodicos(atleta_id);
CREATE INDEX IF NOT EXISTS idx_testes_data ON public.testes_periodicos(data);

-- ============= ROW LEVEL SECURITY =============

-- Enable RLS on all tables
ALTER TABLE public.atletas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ciclos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testes_periodicos ENABLE ROW LEVEL SECURITY;

-- Policies para atletas
DROP POLICY IF EXISTS "Users can view their own atletas" ON public.atletas;
CREATE POLICY "Users can view their own atletas" ON public.atletas
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own atletas" ON public.atletas;
CREATE POLICY "Users can insert their own atletas" ON public.atletas
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own atletas" ON public.atletas;
CREATE POLICY "Users can update their own atletas" ON public.atletas
  FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own atletas" ON public.atletas;
CREATE POLICY "Users can delete their own atletas" ON public.atletas
  FOR DELETE USING (auth.uid() = user_id);

-- Policies para ciclos (baseado em atleta_id)
DROP POLICY IF EXISTS "Users can view ciclos of their atletas" ON public.ciclos;
CREATE POLICY "Users can view ciclos of their atletas" ON public.ciclos
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.atletas WHERE public.atletas.id = public.ciclos.atleta_id AND public.atletas.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Users can insert ciclos for their atletas" ON public.ciclos;
CREATE POLICY "Users can insert ciclos for their atletas" ON public.ciclos
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.atletas WHERE public.atletas.id = atleta_id AND public.atletas.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Users can update ciclos of their atletas" ON public.ciclos;
CREATE POLICY "Users can update ciclos of their atletas" ON public.ciclos
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.atletas WHERE public.atletas.id = public.ciclos.atleta_id AND public.atletas.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Users can delete ciclos of their atletas" ON public.ciclos;
CREATE POLICY "Users can delete ciclos of their atletas" ON public.ciclos
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.atletas WHERE public.atletas.id = public.ciclos.atleta_id AND public.atletas.user_id = auth.uid()
    )
  );

-- Policies para notas
DROP POLICY IF EXISTS "Users can view notas of their atletas" ON public.notas;
CREATE POLICY "Users can view notas of their atletas" ON public.notas
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.atletas WHERE public.atletas.id = public.notas.atleta_id AND public.atletas.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Users can insert notas for their atletas" ON public.notas;
CREATE POLICY "Users can insert notas for their atletas" ON public.notas
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.atletas WHERE public.atletas.id = atleta_id AND public.atletas.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Users can update notas of their atletas" ON public.notas;
CREATE POLICY "Users can update notas of their atletas" ON public.notas
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.atletas WHERE public.atletas.id = public.notas.atleta_id AND public.atletas.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Users can delete notas of their atletas" ON public.notas;
CREATE POLICY "Users can delete notas of their atletas" ON public.notas
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.atletas WHERE public.atletas.id = public.notas.atleta_id AND public.atletas.user_id = auth.uid()
    )
  );

-- Policies para testes_periodicos
DROP POLICY IF EXISTS "Users can view testes of their atletas" ON public.testes_periodicos;
CREATE POLICY "Users can view testes of their atletas" ON public.testes_periodicos
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.atletas WHERE public.atletas.id = public.testes_periodicos.atleta_id AND public.atletas.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Users can insert testes for their atletas" ON public.testes_periodicos;
CREATE POLICY "Users can insert testes for their atletas" ON public.testes_periodicos
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.atletas WHERE public.atletas.id = atleta_id AND public.atletas.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Users can update testes of their atletas" ON public.testes_periodicos;
CREATE POLICY "Users can update testes of their atletas" ON public.testes_periodicos
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.atletas WHERE public.atletas.id = public.testes_periodicos.atleta_id AND public.atletas.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Users can delete testes of their atletas" ON public.testes_periodicos;
CREATE POLICY "Users can delete testes of their atletas" ON public.testes_periodicos
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.atletas WHERE public.atletas.id = public.testes_periodicos.atleta_id AND public.atletas.user_id = auth.uid()
    )
  );
