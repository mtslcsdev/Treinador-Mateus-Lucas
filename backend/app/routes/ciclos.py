from fastapi import APIRouter, HTTPException, Depends
from typing import list
from datetime import datetime
from app.schemas import CicloCreate, CicloResponse
from app.database import get_db

router = APIRouter(prefix="/api/ciclos", tags=["ciclos"])

@router.get("/atleta/{atleta_id}", response_model=list[CicloResponse])
async def listar_ciclos_atleta(atleta_id: int, db = Depends(get_db)):
    """Listar todos os ciclos de um atleta"""
    try:
        response = db.table("ciclos").select("*").eq("atleta_id", atleta_id).order("nome").execute()
        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{ciclo_id}", response_model=CicloResponse)
async def obter_ciclo(ciclo_id: int, db = Depends(get_db)):
    """Obter um ciclo específico"""
    try:
        response = db.table("ciclos").select("*").eq("id", ciclo_id).single().execute()
        if not response.data:
            raise HTTPException(status_code=404, detail="Ciclo não encontrado")
        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("", response_model=CicloResponse)
async def criar_ciclo(ciclo: CicloCreate, db = Depends(get_db)):
    """Criar um novo ciclo"""
    try:
        novo_ciclo = {
            "atleta_id": ciclo.atleta_id,
            "nome": ciclo.nome,
            "descricao": ciclo.descricao,
            "criado_em": datetime.utcnow().isoformat()
        }
        response = db.table("ciclos").insert(novo_ciclo).execute()
        if not response.data:
            raise HTTPException(status_code=400, detail="Erro ao criar ciclo")
        return response.data[0]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/{ciclo_id}", response_model=CicloResponse)
async def atualizar_ciclo(ciclo_id: int, ciclo: CicloCreate, db = Depends(get_db)):
    """Atualizar um ciclo"""
    try:
        response = db.table("ciclos").update({
            "nome": ciclo.nome,
            "descricao": ciclo.descricao
        }).eq("id", ciclo_id).execute()
        
        if not response.data:
            raise HTTPException(status_code=404, detail="Ciclo não encontrado")
        return response.data[0]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{ciclo_id}", status_code=204)
async def deletar_ciclo(ciclo_id: int, db = Depends(get_db)):
    """Deletar um ciclo e todos seus treinos"""
    try:
        db.table("ciclos").delete().eq("id", ciclo_id).execute()
        return None
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
