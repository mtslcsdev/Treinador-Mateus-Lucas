-- ============= TABELA DE ATLETAS =============
CREATE TABLE IF NOT EXISTS atletas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  email TEXT,
  notas TEXT,
  historicoPaces JSONB DEFAULT '[]',
  aderencia INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Index para queries de user_id
CREATE INDEX idx_atletas_user_id ON atletas(user_id);
CREATE INDEX idx_atletas_nome ON atletas(nome);

-- ============= TABELA DE CICLOS =============
CREATE TABLE IF NOT EXISTS ciclos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  atleta_id UUID NOT NULL REFERENCES atletas(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  prova JSONB,
  semanas JSONB NOT NULL DEFAULT '[]',
  is_template BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Indexes para queries de ciclos
CREATE INDEX idx_ciclos_atleta_id ON ciclos(atleta_id);
CREATE INDEX idx_ciclos_is_template ON ciclos(is_template);

-- ============= TABELA DE NOTAS =============
CREATE TABLE IF NOT EXISTS notas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  atleta_id UUID NOT NULL REFERENCES atletas(id) ON DELETE CASCADE,
  ciclo_id UUID REFERENCES ciclos(id) ON DELETE SET NULL,
  data DATE NOT NULL,
  conteudo TEXT NOT NULL,
  tipo TEXT DEFAULT 'geral',
  tags JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE INDEX idx_notas_atleta_id ON notas(atleta_id);
CREATE INDEX idx_notas_ciclo_id ON notas(ciclo_id);
CREATE INDEX idx_notas_data ON notas(data);

-- ============= TABELA DE TESTES PERIÓDICOS =============
CREATE TABLE IF NOT EXISTS testes_periodicos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  atleta_id UUID NOT NULL REFERENCES atletas(id) ON DELETE CASCADE,
  tipo TEXT NOT NULL,
  data DATE NOT NULL,
  resultado JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE INDEX idx_testes_atleta_id ON testes_periodicos(atleta_id);
CREATE INDEX idx_testes_data ON testes_periodicos(data);

-- ============= ROW LEVEL SECURITY =============

-- Enable RLS on all tables
ALTER TABLE atletas ENABLE ROW LEVEL SECURITY;
ALTER TABLE ciclos ENABLE ROW LEVEL SECURITY;
ALTER TABLE notas ENABLE ROW LEVEL SECURITY;
ALTER TABLE testes_periodicos ENABLE ROW LEVEL SECURITY;

-- Policies para atletas
CREATE POLICY "Users can view their own atletas" ON atletas
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own atletas" ON atletas
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own atletas" ON atletas
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own atletas" ON atletas
  FOR DELETE USING (auth.uid() = user_id);

-- Policies para ciclos (baseado em atleta_id)
CREATE POLICY "Users can view ciclos of their atletas" ON ciclos
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM atletas WHERE atletas.id = ciclos.atleta_id AND atletas.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert ciclos for their atletas" ON ciclos
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM atletas WHERE atletas.id = atleta_id AND atletas.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update ciclos of their atletas" ON ciclos
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM atletas WHERE atletas.id = ciclos.atleta_id AND atletas.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete ciclos of their atletas" ON ciclos
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM atletas WHERE atletas.id = ciclos.atleta_id AND atletas.user_id = auth.uid()
    )
  );

-- Policies para notas
CREATE POLICY "Users can view notas of their atletas" ON notas
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM atletas WHERE atletas.id = notas.atleta_id AND atletas.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert notas for their atletas" ON notas
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM atletas WHERE atletas.id = atleta_id AND atletas.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update notas of their atletas" ON notas
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM atletas WHERE atletas.id = notas.atleta_id AND atletas.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete notas of their atletas" ON notas
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM atletas WHERE atletas.id = notas.atleta_id AND atletas.user_id = auth.uid()
    )
  );

-- Policies para testes_periodicos
CREATE POLICY "Users can view testes of their atletas" ON testes_periodicos
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM atletas WHERE atletas.id = testes_periodicos.atleta_id AND atletas.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert testes for their atletas" ON testes_periodicos
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM atletas WHERE atletas.id = atleta_id AND atletas.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update testes of their atletas" ON testes_periodicos
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM atletas WHERE atletas.id = testes_periodicos.atleta_id AND atletas.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete testes of their atletas" ON testes_periodicos
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM atletas WHERE atletas.id = testes_periodicos.atleta_id AND atletas.user_id = auth.uid()
    )
  );
