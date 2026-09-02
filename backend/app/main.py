from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
from datetime import datetime, timedelta
from typing import Optional
from pydantic import BaseModel, EmailStr
from jose import JWTError, jwt
from passlib.context import CryptContext
import uvicorn

load_dotenv()

# Security
SECRET_KEY = os.getenv("JWT_SECRET", "sua-chave-secreta-muito-longa-e-segura")
ALGORITHM = "HS256"
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# FastAPI App
app = FastAPI(
    title="Treinador API",
    description="API para gerenciamento de ciclos de treinos",
    version="1.0.0"
)

# CORS
origins = os.getenv("CORS_ORIGINS", "http://localhost:5173").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic Models
class TokenResponse(BaseModel):
    access_token: str
    token_type: str

class LoginRequest(BaseModel):
    email: str
    senha: str

class AtletaBase(BaseModel):
    nome: str
    email: Optional[str] = None

class AtletaResponse(AtletaBase):
    id: int
    criado_em: datetime
    
class CicloBase(BaseModel):
    nome: str
    descricao: Optional[str] = None
    
class CicloResponse(CicloBase):
    id: int
    atleta_id: int

class TreinoBase(BaseModel):
    dia: Optional[str] = None
    fase: str
    tipo: str
    pace: str
    obs: Optional[str] = None

class TreinoResponse(TreinoBase):
    id: int
    ciclo_id: int

# Routes

@app.get("/")
async def root():
    """Status da API"""
    return {
        "status": "ok",
        "app": "Treinador Mateus Lucas API",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.post("/api/auth/login", response_model=TokenResponse)
async def login(request: LoginRequest):
    """
    Login com email e senha
    Retorna JWT token
    """
    # TODO: Integrar com Supabase Auth
    if request.email == "mateuslucasdev@gmail.com" and request.senha == "senha123":
        access_token = jwt.encode(
            {"sub": request.email, "exp": datetime.utcnow() + timedelta(hours=24)},
            SECRET_KEY,
            algorithm=ALGORITHM
        )
        return {"access_token": access_token, "token_type": "bearer"}
    raise HTTPException(status_code=401, detail="Credenciais inválidas")

@app.get("/api/atletas", response_model=list[AtletaResponse])
async def list_atletas():
    """Listar todos os atletas"""
    # TODO: Implementar com Supabase
    return []

@app.post("/api/atletas", response_model=AtletaResponse)
async def create_atleta(atleta: AtletaBase):
    """Criar novo atleta"""
    # TODO: Implementar com Supabase
    return AtletaResponse(id=1, nome=atleta.nome, email=atleta.email, criado_em=datetime.now())

@app.get("/api/ciclos/{atleta_id}")
async def list_ciclos(atleta_id: int):
    """Listar ciclos de um atleta"""
    # TODO: Implementar com Supabase
    return []

@app.get("/api/relatorios/export/pdf/{atleta_id}")
async def export_pdf(atleta_id: int):
    """Exportar relatório em PDF"""
    # TODO: Implementar geração de PDF
    return {"message": "PDF export not implemented yet"}

@app.get("/health")
async def health():
    """Health check"""
    return {"status": "healthy"}

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host=os.getenv("API_HOST", "0.0.0.0"),
        port=int(os.getenv("API_PORT", 8000)),
        reload=True
    )
