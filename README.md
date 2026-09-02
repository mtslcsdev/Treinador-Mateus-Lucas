# Treinador Mateus Lucas - App de Treinos 🏃

Aplicação web moderna para gerenciamento de ciclos de treinos de corrida, com painel de treinador, autenticação via Supabase e exportação de PDFs.

## 🚀 Stack Tecnológico

- **Frontend:** React 18 + Vite + TypeScript
- **Backend:** Python FastAPI
- **Banco de Dados:** Supabase (PostgreSQL)
- **Autenticação:** Supabase Auth
- **Deploy:** Netlify (Frontend) + Render/Railway (Backend)
- **Versionamento:** GitHub

## 📁 Estrutura do Projeto

```
├── backend/              # API FastAPI
│   ├── app/
│   ├── migrations/
│   ├── requirements.txt
│   └── .env.example
├── frontend/             # App React
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── .env.example
├── backups/             # Dados históricos dos atletas
└── docs/                # Documentação
```

## 🛠️ Setup Local

### Backend (Python)
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Configure suas variáveis de ambiente
python -m uvicorn app.main:app --reload
```

### Frontend (Node.js)
```bash
cd frontend
npm install
cp .env.example .env
# Configure suas variáveis de ambiente
npm run dev
```

## 🔐 Variáveis de Ambiente

Crie um arquivo `.env` em cada pasta baseado em `.env.example`:

### Backend
```
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_KEY=sua-chave
DATABASE_URL=postgresql://...
JWT_SECRET=seu-secret
```

### Frontend
```
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_KEY=sua-chave-anon
VITE_API_URL=http://localhost:8000
```

## 📚 Documentação

- [Backend API Docs](backend/README.md)
- [Frontend Docs](frontend/README.md)
- [Database Schema](docs/database.md)

## 📝 Licença

MIT
