# ✅ SETUP COMPLETADO!

## O Que Foi Feito Até Aqui

✅ **Backend FastAPI**
- Framework FastAPI instalado e configurado
- Ambiente virtual Python criado e ativado
- Todas as dependências instaladas
- Arquivo `.env` configurado com credenciais Supabase

✅ **Frontend React + Vite**
- Node.js e npm verificados (v22 e v10)
- Todas as dependências npm instaladas
- Arquivo `.env.local` configurado com credenciais Supabase

✅ **Conexão Supabase**
- ✅ Conexão testada e funcionando
- ✅ Credenciais configuradas
- ⏳ Aguardando: Criação das tabelas via SQL

✅ **GitHub**
- Repositório sincronizado
- Commits enviados com configurações

---

## ⏳ PRÓXIMAS ETAPAS (IMPORTANTES!)

### 1️⃣ Criar as Tabelas no Supabase (2 minutos)

**Abra seu dashboard Supabase:**
```
https://supabase.com/dashboard/project/pkksvgnlxregdwvbsjhe
```

**Siga estes passos:**

1. Clique em **"SQL Editor"** (menu esquerdo)
2. Clique em **"New Query"**
3. **Cole este SQL:** (está em `docs/supabase-schema.sql`)

```sql
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
```

4. Clique em **"Run"** (botão azul)
5. ✅ Pronto! As tabelas foram criadas

---

### 2️⃣ Rodar o Backend (Terminal 1)

```bash
cd c:\Users\mayra\Desktop\"MEU APP CORRIDA"\backend

# Ativar ambiente
.\venv\Scripts\activate

# Rodar API
python -m uvicorn app.main:app --reload
```

✅ Você verá:
```
INFO:     Application startup complete
INFO:     Uvicorn running on http://127.0.0.1:8000
```

**Acesse:** http://localhost:8000/docs (documentação interativa)

---

### 3️⃣ Rodar o Frontend (Terminal 2)

```bash
cd c:\Users\mayra\Desktop\"MEU APP CORRIDA"\frontend

# Instalar dependências (já feito, mas se precisar)
npm install

# Rodar dev server
npm run dev
```

✅ Você verá:
```
VITE v5.0.8 running at:
  ➜  Local:   http://localhost:5173/
```

**Acesse:** http://localhost:5173

---

### 4️⃣ Fazer Login

Quando abrir http://localhost:5173, você verá a tela de login:

- **Email:** `mateuslucasdev@gmail.com`
- **Senha:** `senha123`

---

## 📁 Arquivos Importantes

| Local | Arquivo | Função |
|-------|---------|--------|
| Backend | `backend/.env` | Credenciais Supabase |
| Frontend | `frontend/.env.local` | Credenciais Supabase |
| Docs | `docs/supabase-schema.sql` | Schema SQL completo |
| Root | `GETTING_STARTED.md` | Guia completo |
| Root | `IMPLEMENTATION.md` | Checklist |
| GitHub | `https://github.com/mtslcsdev/Treinador-Mateus-Lucas` | Seu repositório |

---

## 🚀 Estrutura de Pastas

```
MEU APP CORRIDA/
├── backend/
│   ├── venv/                  ✅ Ambiente virtual criado
│   ├── app/
│   │   ├── main.py           (API principal)
│   │   ├── routes/           (endpoints)
│   │   ├── services/         (PDF, etc)
│   │   └── ...
│   ├── .env                  ✅ Configurado
│   ├── requirements.txt       ✅ Instalado
│   └── test_supabase.py      (teste de conexão)
│
├── frontend/
│   ├── node_modules/         ✅ Instalado
│   ├── src/
│   │   ├── App.tsx
│   │   ├── pages/
│   │   ├── components/
│   │   └── ...
│   ├── .env.local            ✅ Configurado
│   ├── package.json          ✅ Instalado
│   └── ...
│
├── docs/
│   ├── supabase-schema.sql   (SQL para criar tabelas)
│   └── ...
│
└── GitHub (remote)           ✅ Sincronizado
```

---

## ✅ CHECKLIST FINAL

- [x] Python instalado (3.13)
- [x] Node.js instalado (v22)
- [x] Backend venv criado
- [x] Backend dependências instaladas
- [x] Frontend dependências instaladas
- [x] Backend .env configurado
- [x] Frontend .env.local configurado
- [x] Conexão Supabase testada ✅
- [ ] **Tabelas criadas no Supabase (PRÓXIMO PASSO!)**
- [ ] Backend rodando
- [ ] Frontend rodando
- [ ] Login testado
- [ ] Deploy (depois)

---

## 💡 Próximo Comando Para Você Executar

**Abra o Supabase e execute o SQL das tabelas!**

Depois volta aqui e diz: "Tabelas criadas!" ou manda print do Supabase 📸

Aí vou rodar tudo automaticamente pra você! 🚀

---

## 🆘 Em Caso de Erro

**Erro ao conectar no Supabase?**
```bash
cd backend
.\venv\Scripts\python test_supabase.py
```

**Erro ao rodar o backend?**
```bash
cd backend
.\venv\Scripts\pip install -r requirements.txt
```

**Erro ao rodar o frontend?**
```bash
cd frontend
npm install
npm run dev
```

---

**Você está quase lá! 🎉 Só falta criar as tabelas no Supabase!**
