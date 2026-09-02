from fastapi import APIRouter, HTTPException, Depends
from fastapi.responses import StreamingResponse, FileResponse
from io import BytesIO
from app.database import get_db
from app.services.pdf_generator import RelatorioPDFGenerator

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

@router.get("/export/pdf/{atleta_id}")
async def export_pdf_atleta(atleta_id: int, db = Depends(get_db)):
    """Exportar relatório completo em PDF"""
    try:
        # Buscar dados do atleta
        atleta_response = db.table("atletas").select("*").eq("id", atleta_id).single().execute()
        if not atleta_response.data:
            raise HTTPException(status_code=404, detail="Atleta não encontrado")
        
        # Buscar ciclos
        ciclos_response = db.table("ciclos").select("*").eq("atleta_id", atleta_id).execute()
        
        # Buscar treinos
        treinos_response = db.table("treinos").select("*").execute()
        
        # Gerar PDF
        pdf_generator = RelatorioPDFGenerator()
        pdf_buffer = pdf_generator.gerar_relatorio_atleta(
            atleta_response.data,
            ciclos_response.data or [],
            treinos_response.data or []
        )
        
        # Retornar PDF como download
        return StreamingResponse(
            iter([pdf_buffer.getvalue()]),
            media_type="application/pdf",
            headers={"Content-Disposition": f"attachment; filename=relatorio_atleta_{atleta_id}.pdf"}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/export/pdf/treino/{ciclo_id}")
async def export_pdf_treino(ciclo_id: int, db = Depends(get_db)):
    """Exportar treino da semana em PDF (versão simples para imprimir)"""
    try:
        # Buscar ciclo
        ciclo_response = db.table("ciclos").select("*").eq("id", ciclo_id).single().execute()
        if not ciclo_response.data:
            raise HTTPException(status_code=404, detail="Ciclo não encontrado")
        
        ciclo = ciclo_response.data
        
        # Buscar atleta
        atleta_response = db.table("atletas").select("*").eq("id", ciclo['atleta_id']).single().execute()
        if not atleta_response.data:
            raise HTTPException(status_code=404, detail="Atleta não encontrado")
        
        # Buscar treinos
        treinos_response = db.table("treinos").select("*").eq("ciclo_id", ciclo_id).execute()
        
        # Gerar PDF
        pdf_generator = RelatorioPDFGenerator()
        pdf_buffer = pdf_generator.gerar_treino_imprimivel(
            atleta_response.data,
            ciclo,
            treinos_response.data or []
        )
        
        # Retornar PDF como download
        return StreamingResponse(
            iter([pdf_buffer.getvalue()]),
            media_type="application/pdf",
            headers={"Content-Disposition": f"attachment; filename=treino_ciclo_{ciclo_id}.pdf"}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
