from sqlalchemy import Column, Text, Integer, ForeignKey
from sqlalchemy.orm import relationship
from config.db import Base, engine

class Imagen(Base):
    __tablename__ = 'imagesproperties'

    id = Column(Integer, primary_key=True, index=True)
    image = Column(Text)
    property_id = Column(Integer, ForeignKey('properties.id'))

    # Relación inversa con la tabla de propiedades
#     property = relationship("Property", back_populates="imagenes")

# Base.metadata.create_all(engine)