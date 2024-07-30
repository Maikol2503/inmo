from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
from config.db import Base, engine
from fastapi.middleware.cors import CORSMiddleware
from administracion.API_login.routes.register import admiRegister
from administracion.API_login.routes.login import admiLogin
from administracion.API_property.routes.add import addProperties
from administracion.API_clients.routes import addClient
from administracion.API_property.images_propertys.routes.add import addImagenProperty

app = FastAPI()
jinja2Templates = Jinja2Templates(directory="templates")

app.include_router(admiRegister)
app.include_router(admiLogin)
app.include_router(addProperties)
app.include_router(addClient)
app.include_router(addImagenProperty)

Base.metadata.create_all(bind=engine)


origins = [
    "http://localhost:4200",
]

# Configuración de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Permitir solicitudes de estos orígenes
    allow_credentials=True,  # Permitir envío de cookies con solicitudes
    allow_methods=["*"],  # Permitir todos los métodos (GET, POST, etc.)
    allow_headers=["*"],  # Permitir todos los encabezados
)

@app.get("/")
def root():
    return {
        "message":"hola"
    }