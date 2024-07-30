from typing import List, Optional
from pydantic import BaseModel


class DatosPropiedad(BaseModel):
    titulo: Optional[str] = None
    descripcion: Optional[str] = None
    precio: Optional[float] = None
    tipo: Optional[str] = None
    habitaciones: Optional[int] = None
    banos: Optional[int] = None
    ubicacion: Optional[str] = None
    orientacion: Optional[str] = None
    piscina: Optional[bool] = None
    trastero: Optional[bool] = None
    garaje: Optional[bool] = None
    gimnasio: Optional[bool] = None