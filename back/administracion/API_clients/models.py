from sqlalchemy import Column, Float, String, Table, Text
from sqlalchemy.sql.sqltypes import Integer
from config.db import meta, engine, Base

class Cliente(Base):
    __tablename__ = 'clientes'

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100)) 
    apellido = Column(String(100)) 
    documento = Column(String(100)) 
    correo = Column(String(100)) 
    telefono = Column(String(100))