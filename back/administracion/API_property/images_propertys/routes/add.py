from fastapi import APIRouter, HTTPException, Depends
from fastapi.responses import JSONResponse
import httpx
from administracion.API_property.images_propertys.schemas.image_request import ImageRequest
from administracion.API_property.images_propertys.schemas.imagePropertySchema import imagePropertySchema
from administracion.API_property.models.images_properties_model import Imagen
from config.db import Session

# Crear un router para manejar las propiedades
addImagenProperty = APIRouter()

# Instanciar la sesión de base de datos (esto debe ser manejado en un contexto de dependencias idealmente)
db = Session()

# URL del servicio cliente
url = 'http://localhost:8000/'

def chunks(lst, n):
    """Divide una lista en trozos de tamaño n."""
    for i in range(0, len(lst), n):
        yield lst[i:i + n]



@addImagenProperty.post("/agregar-imagenes-propiedad")
async def addImageProperty(request:ImageRequest):
    
    imagenes = request.imagenes
    id: int = request.id_property

    try:
        # Procesa las imágenes en lotes de 2
        for imagenes_chunk in chunks(imagenes, 1):
            for imagen in imagenes_chunk:
                # Asegúrate de que 'imagen' es una cadena válida para el campo 'image'
                db.add(Imagen(property_id=id, image=imagen))
            db.commit()
            # Optional: Añade un pequeño retraso si es necesario para evitar sobrecarga
            # import time
            # time.sleep(1)
            
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

    return {"message": "Imágenes guardadas con éxito"}

   
 