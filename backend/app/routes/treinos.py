from fastapi import APIRouter, HTTPException, Depends
from typing import list
from datetime import datetime
from app.schemas import TreinoCreate, TreinoResponse
from app.database import get_db

router = APIRouter(prefix="/api/treinos", tags=["treinos"])

@router.get("/ciclo/{ciclo_id}", response_model=list[TreinoResponse])
async def listar_treinos_ciclo(ciclo_id: int, db = Depends(get_db)):
    """Listar todos os treinos de um ciclo"""
    try:
        response = db.table("treinos").select("*").eq("ciclo_id", ciclo_id).order("criado_em").execute()
        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{treino_id}", response_model=TreinoResponse)
async def obter_treino(treino_id: int, db = Depends(get_db)):
    """Obter um treino específico"""
    try:
        response = db.table("treinos").select("*").eq("id", treino_id).single().execute()
        if not response.data:
            raise HTTPException(status_code=404, detail="Treino não encontrado")
        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("", response_model=TreinoResponse)
async def criar_treino(treino: TreinoCreate, db = Depends(get_db)):
    """Criar um novo treino"""
    try:
        novo_treino = {
            "ciclo_id": treino.ciclo_id,
            "dia": treino.dia,
            "fase": treino.fase,
            "tipo": treino.tipo,
            "pace": treino.pace,
            "obs": treino.obs,
            "criado_em": datetime.utcnow().isoformat()
        }
        response = db.table("treinos").insert(novo_treino).execute()
        if not response.data:
            raise HTTPException(status_code=400, detail="Erro ao criar treino")
        return response.data[0]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/{treino_id}", response_model=TreinoResponse)
async def atualizar_treino(treino_id: int, treino: TreinoCreate, db = Depends(get_db)):
    """Atualizar um treino"""
    try:
        response = db.table("treinos").update({
            "dia": treino.dia,
            "fase": treino.fase,
            "tipo": treino.tipo,
            "pace": treino.pace,
            "obs": treino.obs
        }).eq("id", treino_id).execute()
        
        if not response.data:
            raise HTTPException(status_code=404, detail="Treino não encontrado")
        return response.data[0]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{treino_id}", status_code=204)
async def deletar_treino(treino_id: int, db = Depends(get_db)):
    """Deletar um treino"""
    try:
        db.table("treinos").delete().eq("id", treino_id).execute()
        return None
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
