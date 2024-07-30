from fastapi import APIRouter, HTTPException, Depends
from fastapi.responses import JSONResponse
import httpx
from administracion.API_clients.models import Cliente
from administracion.API_property.models.propertys_model import Property
from administracion.API_property.schemas.create_property import CreateProperty
from config.db import Session

# Crear un router para manejar las propiedades
addProperties = APIRouter()

# Instanciar la sesión de base de datos (esto debe ser manejado en un contexto de dependencias idealmente)
db = Session()

# URL del servicio cliente
url = 'http://localhost:8000/'

@addProperties.post("/api/publicar-propiedad/")
async def create_property(property: CreateProperty):
   
 
    try:
        # Llamar a la función addClient para agregar el cliente y obtener el ID
        id_client = await addClient(property.datosCliente.dict())
        # Llamar a la función que maneja la creación de la propiedad
        id_new_property = await addProperty(id_client, property)

        await addImagenProperty(id_new_property, property.fotos)
        # print(type(property.fotos))
        return property.fotos
    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail="Error al crear la propiedad")
    finally:
        db.close()






async def addClient(data: dict) -> int:
    async with httpx.AsyncClient() as client:
        response = await client.post(f"{url}agregar-cliente", json=data)
        # Verificar que la respuesta sea exitosa
        if response.status_code == 200:
            cliente_data = response.json()
            cliente_id = cliente_data.get("id")
            if cliente_id is not None:
                return cliente_id
            else:
                raise HTTPException(status_code=500, detail="No se recibió el ID del cliente.")
        else:
            # Manejar el caso de error HTTP
            raise HTTPException(status_code=response.status_code, detail=response.json().get("detail", "Error desconocido"))




async def addProperty(id_client: int, data: CreateProperty):
    try:
        # Crear una nueva propiedad usando el id_client y los datos de la propiedad
        new_property = Property(cliente_id=id_client, **data.datosPropiedad.dict())
        
        db.add(new_property)
        db.commit()
        db.refresh(new_property)
        
        return new_property.id
    except Exception as e:
        db.rollback()
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail="Error al crear la propiedad")








async def addImagenProperty(id_property:int, imagenes:list):
    print(type(imagenes))

    data_imagenes = {
        'id_property':id_property,
        'imagenes': imagenes
    }



    

    async with httpx.AsyncClient() as client:
        response = await client.post(f"{url}agregar-imagenes-propiedad", json=data_imagenes)
        # Verificar que la respuesta sea exitosa
        if response.status_code == 200:
            return 'Imagenes agregadas'
       
        else:
            # Manejar el caso de error HTTP
            raise HTTPException(status_code=response.status_code, detail=response.json().get("detail", "Error desconocido"))





# Nota: La sesión de base de datos se debería gestionar adecuadamente en un contexto de dependencias.
# Asegúrate de usar un manejo adecuado de la sesión de base de datos para evitar problemas de conexión.
