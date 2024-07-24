from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
from config.db import Base, engine
from routes.admi.register import admiRegister
from routes.admi.login import admiLogin
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
jinja2Templates = Jinja2Templates(directory="templates")

# app.include_router(login)
app.include_router(admiRegister)
app.include_router(admiLogin)

Base.metadata.create_all(bind=engine)


# Configuración de CORS
origins = [
    "http://localhost:4200",  # URL de tu aplicación Angular
    # puedes agregar más orígenes si es necesario
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # puedes restringir los métodos si es necesario
    allow_headers=["*"],  # puedes restringir los encabezados si es necesario
)


@app.get("/")
def root():
    return {
        "message":"hola"
    }