from typing import List, Optional
from pydantic import BaseModel



class imagePropertySchema(BaseModel):
    
    imagen:str
    id_property: int

    class Config:
        orm_mode = True
        from_attributes = True