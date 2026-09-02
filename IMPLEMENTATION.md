# 📋 Checklist de Implementação

## ✅ Completado

- [x] Setup Git e repositório GitHub
- [x] Estrutura de pastas (backend, frontend)
- [x] Backend FastAPI básico com rotas
- [x] Frontend React com Vite
- [x] Autenticação básica
- [x] Schema Supabase
- [x] Docker Compose

## ⏳ Em Progresso

- [ ] Configurar Supabase (sua conta)
- [ ] Migrar dados dos backups
- [ ] Implementar PDF export
- [ ] Melhorar UI do painel
- [ ] Testes

## 📝 Próximos Passos

### 1. Configurar Supabase (IMPORTANTE!)

```bash
# 1. Crie uma conta em supabase.com
# 2. Execute o SQL em docs/supabase-schema.sql
# 3. Copie as credenciais para backend/.env e frontend/.env.local
```

### 2. Instalar Dependências

```bash
# Backend
cd backend
pip install -r requirements.txt

# Frontend
cd frontend
npm install
```

### 3. Migrar Dados

```bash
cd backend
python migrate_backups.py
```

### 4. Executar Localmente

```bash
# Terminal 1 - Backend
cd backend
python -m uvicorn app.main:app --reload

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### 5. Acessar

- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

### 6. Deploy

- Frontend → Netlify
- Backend → Render ou Railway
- Banco → Supabase (já hospedado)

## 🎯 Funcionalidades Principais

- [x] Autenticação com login/senha
- [x] CRUD de atletas
- [x] CRUD de ciclos
- [x] CRUD de treinos
- [ ] Visualização de relatórios
- [ ] Exportação de PDF
- [ ] Dashboard com estatísticas
- [ ] Gráficos de aderência

## 🚀 Deploy

Quando estiver pronto:

1. **Frontend (Netlify)**
   - Conectar repositório GitHub
   - Build: `npm run build`
   - Output: `dist`
   - Variáveis: Adicionar VITE_* no painel

2. **Backend (Render/Railway)**
   - Conectar repositório GitHub
   - Build: `pip install -r backend/requirements.txt`
   - Start: `python -m uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - Variáveis: Adicionar SUPABASE_* no painel

## 📞 Suporte

Consulte:
- [docs/SUPABASE-SETUP.md](./SUPABASE-SETUP.md)
- [backend/README.md](../backend/README.md)
- [frontend/README.md](../frontend/README.md)
