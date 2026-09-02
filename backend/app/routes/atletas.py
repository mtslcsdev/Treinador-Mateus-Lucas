from fastapi import APIRouter, HTTPException, Depends, status
from typing import list
from datetime import datetime
from app.schemas import AtletaCreate, AtletaResponse
from app.database import get_db

router = APIRouter(prefix="/api/atletas", tags=["atletas"])

@router.get("", response_model=list[AtletaResponse])
async def listar_atletas(db = Depends(get_db)):
    """Listar todos os atletas"""
    try:
        response = db.table("atletas").select("*").order("nome").execute()
        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{atleta_id}", response_model=AtletaResponse)
async def obter_atleta(atleta_id: int, db = Depends(get_db)):
    """Obter um atleta específico"""
    try:
        response = db.table("atletas").select("*").eq("id", atleta_id).single().execute()
        if not response.data:
            raise HTTPException(status_code=404, detail="Atleta não encontrado")
        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("", response_model=AtletaResponse)
async def criar_atleta(atleta: AtletaCreate, db = Depends(get_db)):
    """Criar um novo atleta"""
    try:
        novo_atleta = {
            "nome": atleta.nome,
            "email": atleta.email,
            "criado_em": datetime.utcnow().isoformat()
        }
        response = db.table("atletas").insert(novo_atleta).execute()
        if not response.data:
            raise HTTPException(status_code=400, detail="Erro ao criar atleta")
        return response.data[0]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/{atleta_id}", response_model=AtletaResponse)
async def atualizar_atleta(atleta_id: int, atleta: AtletaCreate, db = Depends(get_db)):
    """Atualizar um atleta"""
    try:
        response = db.table("atletas").update({
            "nome": atleta.nome,
            "email": atleta.email
        }).eq("id", atleta_id).execute()
        
        if not response.data:
            raise HTTPException(status_code=404, detail="Atleta não encontrado")
        return response.data[0]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{atleta_id}", status_code=204)
async def deletar_atleta(atleta_id: int, db = Depends(get_db)):
    """Deletar um atleta"""
    try:
        db.table("atletas").delete().eq("id", atleta_id).execute()
        return None
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
