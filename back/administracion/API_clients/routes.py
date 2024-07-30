from fastapi import APIRouter, FastAPI, Form, HTTPException
from fastapi.responses import JSONResponse
from administracion.API_clients.models import Cliente
from administracion.API_clients.schemas import DatosCliente
from config.db import Session, conn, engine

from sqlalchemy.exc import SQLAlchemyError


from fastapi import FastAPI, HTTPException, Depends


db = Session()
addClient = APIRouter()

@addClient.post("/agregar-cliente")
async def create_property(cliente:DatosCliente):
   
    new_client = Cliente(**cliente.dict())
    db.add(new_client)
    db.commit()
    db.refresh(new_client)

    return new_client
    