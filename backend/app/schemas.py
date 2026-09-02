from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr

# Auth Models
class LoginRequest(BaseModel):
    email: str
    senha: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str

# Atleta Models
class AtletaBase(BaseModel):
    nome: str
    email: Optional[str] = None

class AtletaCreate(AtletaBase):
    pass

class AtletaResponse(AtletaBase):
    id: int
    criado_em: datetime
    
    class Config:
        from_attributes = True

# Ciclo Models
class CicloBase(BaseModel):
    nome: str
    descricao: Optional[str] = None

class CicloCreate(CicloBase):
    atleta_id: int

class CicloResponse(CicloBase):
    id: int
    atleta_id: int
    criado_em: datetime
    
    class Config:
        from_attributes = True

# Semana Models
class SemanaBase(BaseModel):
    semana: int
    nome: Optional[str] = None

class SemanaCreate(SemanaBase):
    ciclo_id: int

class SemanaResponse(SemanaBase):
    id: int
    ciclo_id: int
    
    class Config:
        from_attributes = True

# Treino Models
class TreinoBase(BaseModel):
    dia: Optional[str] = None
    fase: str
    tipo: str
    pace: str
    obs: Optional[str] = None

class TreinoCreate(TreinoBase):
    semana_id: int

class TreinoResponse(TreinoBase):
    id: int
    semana_id: int
    criado_em: datetime
    
    class Config:
        from_attributes = True

# Relatório Models
class RelatorioAtletaResponse(BaseModel):
    atleta: AtletaResponse
    ciclos: list[CicloResponse]
    total_treinos: int
    aderencia: float
    
    class Config:
        from_attributes = True
