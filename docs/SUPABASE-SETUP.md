# 🚀 Guia de Configuração - Supabase

## 1️⃣ Criar Projeto Supabase

1. Acesse [https://supabase.com](https://supabase.com)
2. Clique em **"New Project"**
3. Preencha:
   - **Project name:** `Treinador-Mateus-Lucas`
   - **Database password:** Use uma senha forte
   - **Region:** Brazil - São Paulo (ou a mais próxima)
4. Clique em **"Create new project"** e aguarde (5-10 minutos)

## 2️⃣ Executar Schema SQL

1. Na dashboard do Supabase, vá para **SQL Editor**
2. Clique em **"New Query"**
3. Cole o conteúdo de [supabase-schema.sql](./supabase-schema.sql)
4. Clique em **"Run"**

## 3️⃣ Pegar as Credenciais

1. Vá para **Settings → API**
2. Copie:
   - `Project URL` → `SUPABASE_URL`
   - `anon public` → `SUPABASE_ANON_KEY`
   - `service_role secret` → `SUPABASE_KEY`

## 4️⃣ Configurar Variáveis de Ambiente

### Backend (backend/.env)
```env
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_KEY=sua-chave-service-role
SUPABASE_ANON_KEY=sua-chave-anon
JWT_SECRET=sua-chave-secreta-muito-longa-aqui
```

### Frontend (frontend/.env.local)
```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_KEY=sua-chave-anon
VITE_API_URL=http://localhost:8000
```

## 5️⃣ Testar Conexão

```bash
# Terminal no diretório backend
python -c "from app.database import init_supabase; print('✓ Supabase conectado!')"
```

## 6️⃣ Ativar Autenticação (Opcional)

Se quiser usar Supabase Auth:

1. Vá para **Authentication → Providers**
2. Ative **Email** (já vem ativado)
3. Configure **Email Templates** se necessário
4. Vá para **Users** e crie um usuário com seu email

## 📊 Estrutura de Dados

| Tabela | Descrição |
|--------|-----------|
| **atletas** | Dados dos atletas |
| **ciclos** | Ciclos de treino |
| **semanas** | Semanas dentro de um ciclo |
| **treinos** | Treinos específicos |
| **execucoes_treinos** | Registro de treinos realizados |
| **treinadores** | Usuários do sistema |

## 🔒 Segurança

- Todas as tabelas têm **Row Level Security (RLS)** ativado
- Usuários autenticados podem acessar dados
- Senhas devem estar em **.env** e **nunca** em Git

## 🆘 Troubleshooting

**Erro: "SUPABASE_URL and SUPABASE_KEY must be set"**
- Verifique se `.env` está configurado corretamente
- Não esqueça de fazer `source venv/bin/activate` (Windows: `venv\Scripts\activate`)

**Erro: "Could not connect to Supabase"**
- Verifique as credenciais (URL e KEY)
- Certifique-se que o projeto foi criado e está ativo

**Erro: "permission denied"**
- Verifique as políticas RLS nas tabelas
- Certifique-se que você está usando a `service_role` key

## 📚 Recursos

- [Docs Supabase](https://supabase.com/docs)
- [Supabase Python SDK](https://github.com/supabase/supabase-py)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
