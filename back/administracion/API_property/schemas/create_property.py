from typing import List, Optional
from pydantic import BaseModel
from administracion.API_clients.schemas import DatosCliente
from administracion.API_property.schemas.data_property import DatosPropiedad


class CreateProperty(BaseModel):
    datosPropiedad: DatosPropiedad
    datosCliente: DatosCliente
    fotos: Optional[List[str]] = None

    class Config:
        orm_mode = True
        from_attributes = True