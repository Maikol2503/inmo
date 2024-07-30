from typing import List, Optional
from pydantic import BaseModel

class ImageRequest(BaseModel):
    id_property: int
    imagenes: List[str]