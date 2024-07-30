from sqlalchemy import Boolean, Column, Float, ForeignKey, String, Text, Integer
from sqlalchemy.orm import relationship
from config.db import Base

class Property(Base):
    __tablename__ = 'properties'

    id = Column(Integer, primary_key=True, index=True)
    titulo = Column(String(100))
    descripcion = Column(Text)
    precio = Column(Float)
    tipo = Column(String(100))
    habitaciones = Column(Integer)
    banos = Column(Integer)
    ubicacion = Column(String(100))
    orientacion = Column(String(100))

    piscina = Column(Boolean, default=False)
    trastero = Column(Boolean, default=False)
    garaje = Column(Boolean, default=False)
    gimnasio = Column(Boolean, default=False)

    cliente_id = Column(Integer, ForeignKey('clientes.id'))

    # Relación con la tabla de imágenes
    # imagenes = relationship("Imagen", back_populates="property")
