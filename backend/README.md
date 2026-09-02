# Backend API - Treinador Mateus Lucas

API FastAPI para gerenciamento de atletas, ciclos e treinos.

## 📦 Instalação

```bash
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

## 🚀 Executar

```bash
python -m uvicorn app.main:app --reload
```

API estará disponível em `http://localhost:8000`

Documentação interativa: `http://localhost:8000/docs`

## 📚 Endpoints

### Autenticação
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Registrar (apenas admin)
- `POST /api/auth/logout` - Logout

### Atletas
- `GET /api/atletas` - Listar todos
- `GET /api/atletas/{id}` - Obter um
- `POST /api/atletas` - Criar
- `PUT /api/atletas/{id}` - Atualizar
- `DELETE /api/atletas/{id}` - Deletar

### Ciclos
- `GET /api/ciclos/{atleta_id}` - Listar ciclos de um atleta
- `POST /api/ciclos` - Criar ciclo
- `PUT /api/ciclos/{id}` - Atualizar
- `DELETE /api/ciclos/{id}` - Deletar

### Treinos
- `GET /api/treinos/{ciclo_id}` - Listar treinos de um ciclo
- `POST /api/treinos` - Criar treino
- `PUT /api/treinos/{id}` - Atualizar
- `DELETE /api/treinos/{id}` - Deletar

### Relatórios
- `GET /api/relatorios/atleta/{id}` - Relatório completo de um atleta
- `GET /api/relatorios/semana` - Relatório da semana
- `POST /api/relatorios/export/pdf` - Exportar PDF

## 🗄️ Banco de Dados

Schema criado via migrations Alembic em `app/migrations/`

Para criar novas migrations:
```bash
alembic revision --autogenerate -m "Descrição da mudança"
alembic upgrade head
```
