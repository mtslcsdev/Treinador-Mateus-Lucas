from fastapi import APIRouter, HTTPException
from datetime import datetime, timedelta
from jose import jwt
import os

router = APIRouter(prefix="/api/auth", tags=["auth"])

SECRET_KEY = os.getenv("JWT_SECRET", "sua-chave-secreta-muito-longa")
ALGORITHM = "HS256"

# Credencial fixa para demonstração (será trocado por Supabase Auth)
VALID_EMAIL = "mateuslucasdev@gmail.com"
VALID_PASSWORD = "senha123"

@router.post("/login")
async def login(email: str, senha: str):
    """Login com email e senha - DEMO apenas"""
    if email == VALID_EMAIL and senha == VALID_PASSWORD:
        access_token = jwt.encode(
            {
                "sub": email,
                "exp": datetime.utcnow() + timedelta(hours=24)
            },
            SECRET_KEY,
            algorithm=ALGORITHM
        )
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user": {
                "email": email,
                "nome": "Mateus Lucas"
            }
        }
    
    raise HTTPException(status_code=401, detail="Credenciais inválidas")

@router.post("/logout")
async def logout():
    """Logout - limpar token no frontend"""
    return {"message": "Logout bem-sucedido"}
