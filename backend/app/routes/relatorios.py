from fastapi import APIRouter, HTTPException, Depends
from fastapi.responses import StreamingResponse
from io import BytesIO
from app.database import get_db

router = APIRouter(prefix="/api/relatorios", tags=["relatorios"])

@router.get("/atleta/{atleta_id}")
async def relatorio_completo_atleta(atleta_id: int, db = Depends(get_db)):
    """Obter relatório completo de um atleta"""
    try:
        # Buscar atleta
        atleta_response = db.table("atletas").select("*").eq("id", atleta_id).single().execute()
        if not atleta_response.data:
            raise HTTPException(status_code=404, detail="Atleta não encontrado")
        
        # Buscar ciclos
        ciclos_response = db.table("ciclos").select("*").eq("atleta_id", atleta_id).execute()
        
        # Buscar treinos
        treinos_response = db.table("treinos").select("*").execute()
        
        return {
            "atleta": atleta_response.data,
            "ciclos": ciclos_response.data,
            "treinos": treinos_response.data,
            "total_treinos": len(treinos_response.data) if treinos_response.data else 0
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/semana/")
async def relatorio_semana(db = Depends(get_db)):
    """Obter relatório da semana atual"""
    try:
        # TODO: Implementar lógica de semana
        return {
            "semana": "1-2",
            "data_inicio": "2026-09-01",
            "data_fim": "2026-09-07",
            "total_treinos": 0,
            "atletas": []
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/export/pdf/{atleta_id}")
async def export_pdf_atleta(atleta_id: int, db = Depends(get_db)):
    """Exportar relatório em PDF"""
    try:
        # Buscar dados do atleta
        atleta_response = db.table("atletas").select("*").eq("id", atleta_id).single().execute()
        if not atleta_response.data:
            raise HTTPException(status_code=404, detail="Atleta não encontrado")
        
        # TODO: Implementar geração de PDF com html2pdf
        # Por enquanto, retornar JSON
        return {
            "message": "PDF export not implemented yet",
            "atleta": atleta_response.data
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
