# 🚀 Guia Completo - App de Treinos

Seu app está 95% pronto! Este guia explica os últimos passos e como usar.

## 📋 Índice

1. [Estrutura do Projeto](#estrutura)
2. [Setup Inicial](#setup)
3. [Configuração Supabase](#supabase)
4. [Executar Localmente](#local)
5. [Usar o App](#usar)
6. [Deploy](#deploy)
7. [Migração de Dados](#dados)
8. [Troubleshooting](#troubleshooting)

---

## 🏗️ Estrutura do Projeto {#estrutura}

```
├── backend/                    # API Python FastAPI
│   ├── app/
│   │   ├── main.py            # Aplicação principal
│   │   ├── database.py        # Conexão com Supabase
│   │   ├── schemas.py         # Modelos Pydantic
│   │   ├── routes/            # Endpoints da API
│   │   │   ├── auth.py        # Login/Logout
│   │   │   ├── atletas.py     # CRUD de atletas
│   │   │   ├── ciclos.py      # CRUD de ciclos
│   │   │   ├── treinos.py     # CRUD de treinos
│   │   │   └── relatorios.py  # Relatórios e PDF
│   │   └── services/
│   │       └── pdf_generator.py # Geração de PDFs
│   ├── requirements.txt        # Dependências Python
│   ├── Dockerfile
│   └── migrate_backups.py      # Script para migrar dados
│
├── frontend/                   # App React + Vite
│   ├── src/
│   │   ├── pages/             # Páginas da aplicação
│   │   ├── components/        # Componentes React
│   │   ├── services/          # API e Supabase
│   │   ├── contexts/          # Auth e Supabase contexts
│   │   └── App.tsx            # Componente raiz
│   ├── package.json
│   ├── Dockerfile
│   └── vite.config.ts
│
├── docs/                       # Documentação
│   ├── supabase-schema.sql    # Schema do banco
│   └── SUPABASE-SETUP.md      # Guide setup Supabase
│
├── .gitignore
├── README.md
├── IMPLEMENTATION.md
└── docker-compose.yml         # Para rodar tudo localmente
```

---

## ⚙️ Setup Inicial {#setup}

### 1. Clonar ou Baixar o Projeto

Se você cloneu do GitHub:

```bash
git clone https://github.com/mtslcsdev/Treinador-Mateus-Lucas.git
cd Treinador-Mateus-Lucas
```

Se baixou como ZIP, extraia e entre na pasta.

### 2. Instalar Python (Backend)

```bash
# Verificar se tem Python 3.9+
python --version

# Se não tiver, baixar em python.org
```

### 3. Instalar Node.js (Frontend)

```bash
# Verificar se tem Node 18+
node --version

# Se não tiver, baixar em nodejs.org
```

---

## 🔐 Configuração Supabase {#supabase}

### Passo 1: Criar Conta

1. Acesse [https://supabase.com](https://supabase.com)
2. Clique em **"Sign Up"**
3. Use email: `mateuslucasdev@gmail.com`
4. Confirme via email

### Passo 2: Criar Projeto

1. No dashboard, clique em **"New Project"**
2. Preencha:
   - **Name:** `treinador-app`
   - **Database Password:** Use uma senha forte (salve em lugar seguro!)
   - **Region:** `South America - São Paulo`
3. Clique em **"Create new project"** (aguarde 5-10 minutos)

### Passo 3: Executar Schema SQL

1. No Supabase, vá para **"SQL Editor"** (menu esquerdo)
2. Clique em **"New Query"**
3. Cole o conteúdo de `docs/supabase-schema.sql`
4. Clique em **"Run"** ✓

### Passo 4: Copiar Credenciais

1. Vá para **"Settings"** → **"API"** (menu esquerdo)
2. Copie e guarde em local seguro:

**Backend (.env)**
```env
SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
JWT_SECRET=uma-chave-secreta-muito-longa-e-aleatoria-aqui
```

**Frontend (.env.local)**
```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
VITE_SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_API_URL=http://localhost:8000
```

### Passo 5: Criar Arquivos .env

**Backend (backend/.env)**
```bash
cd backend
cp .env.example .env
# Edite com as credenciais do Supabase
```

**Frontend (frontend/.env.local)**
```bash
cd ../frontend
cp .env.example .env.local
# Edite com as credenciais do Supabase
```

---

## 💻 Executar Localmente {#local}

### Terminal 1 - Backend

```bash
cd backend

# Criar ambiente virtual
python -m venv venv

# Ativar (Windows)
venv\Scripts\activate

# Ativar (Mac/Linux)
source venv/bin/activate

# Instalar dependências
pip install -r requirements.txt

# Executar API
python -m uvicorn app.main:app --reload
```

Backend rodará em: **http://localhost:8000**
Docs interativa: **http://localhost:8000/docs**

### Terminal 2 - Frontend

```bash
cd frontend

# Instalar dependências
npm install

# Executar dev server
npm run dev
```

Frontend rodará em: **http://localhost:5173**

---

## 🎮 Usar o App {#usar}

### 1. Acessar

Abra o navegador: **http://localhost:5173**

### 2. Login

- **Email:** `mateuslucasdev@gmail.com`
- **Senha:** `senha123` (você pode mudar depois no Supabase)

### 3. Painel Principal

Você verá:
- Lista de atletas
- Estatísticas (aderência, volume, etc)
- Opções para adicionar atletas

### 4. Funções Principais

**Adicionar Atleta**
- Clique em "Novo atleta"
- Preencha nome e email
- Clique em "Salvar"

**Visualizar Treinos**
- Clique no atleta para ver detalhes
- Você verá seus ciclos e treinos

**Exportar PDF**
- Clique em "Exportar" ao lado do atleta
- PDF será baixado automaticamente

---

## 📊 Migração de Dados {#dados}

Se você tem dados nos arquivos JSON em `backups/`:

```bash
cd backend

# Ativar venv se não estiver ativado
# Windows: venv\Scripts\activate
# Mac/Linux: source venv/bin/activate

# Executar script de migração
python migrate_backups.py
```

Este script irá:
- Ler todos os JSONs em `backups/`
- Inserir dados no Supabase
- Manter histórico original

---

## 🌐 Deploy {#deploy}

### Frontend - Netlify

1. Acesse [https://netlify.com](https://netlify.com)
2. Clique em **"Add new site"** → **"Import an existing project"**
3. Selecione seu repositório GitHub
4. Preencha:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Clique em **"Deploy site"**

Após o deploy, adicione as variáveis de ambiente:
- Vá para **"Site settings"** → **"Build & deploy"** → **"Environment"**
- Adicione `VITE_*` do seu `.env.local`

### Backend - Render ou Railway

**Opção 1: Render**

1. Acesse [https://render.com](https://render.com)
2. Clique em **"New Web Service"**
3. Conecte seu repositório GitHub
4. Preencha:
   - **Build command:** `pip install -r backend/requirements.txt`
   - **Start command:** `python -m uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. Adicione variáveis de ambiente (SUPABASE_URL, SUPABASE_KEY, etc)
6. Clique em **"Deploy"**

**Opção 2: Railway**

1. Acesse [https://railway.app](https://railway.app)
2. Clique em **"New Project"** → **"Deploy from GitHub"**
3. Selecione seu repositório
4. Configure:
   - **Root Directory:** `backend`
   - **Start Command:** `python -m uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. Adicione variáveis de ambiente
6. Clique em **"Deploy"**

---

## 🐛 Troubleshooting {#troubleshooting}

### Erro: "SUPABASE_URL not found"

- Verifique se `.env` existe no backend
- Verifique se as credenciais foram copiadas corretamente
- Reinicie o servidor (`Ctrl+C` e rode novamente)

### Erro: "Could not connect to Supabase"

- Verifique a conexão internet
- Verifique se o projeto Supabase está ativo
- Copie a URL e KEY do painel Settings

### Frontend não conecta com Backend

- Verifique se ambos estão rodando em portos diferentes
- Verifique CORS em `backend/app/main.py` - deve incluir `http://localhost:5173`
- Verifique `VITE_API_URL` no `.env.local`

### Erro ao fazer Login

- Email padrão: `mateuslucasdev@gmail.com`
- Senha padrão: `senha123`
- Se quiser mudar, configure no Supabase Auth

### PDF não gera

- Verifique se `reportlab` foi instalado: `pip list | grep reportlab`
- Reinstale dependências: `pip install -r requirements.txt --upgrade`

---

## 📞 Suporte

Consulte:
- [docs/SUPABASE-SETUP.md](docs/SUPABASE-SETUP.md) - Detalhe sobre Supabase
- [backend/README.md](backend/README.md) - Documentação da API
- [frontend/README.md](frontend/README.md) - Documentação do React
- Docs interativa da API: http://localhost:8000/docs

---

## 🎯 Próximos Passos (Opcional)

- [ ] Implementar relatórios interativos no painel
- [ ] Adicionar gráficos de performance
- [ ] Integrar com Strava ou outros apps
- [ ] Notificações por email
- [ ] App mobile com React Native

---

**Você conseguiu! 🎉 Seu app está pronto para uso!**
