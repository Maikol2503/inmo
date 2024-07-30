import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NavComponent } from '../nav/nav.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-formulario-publicar-propiedad',
  standalone: true,
  imports: [FormsModule, NavComponent, CommonModule],
  templateUrl: './formulario-publicar-propiedad.component.html',
  styleUrl: './formulario-publicar-propiedad.component.css'
})
export class FormularioPublicarPropiedadComponent {
  // Propiedad para almacenar las imágenes seleccionadas
  imagenes: File[] = [];
  imagePreviews: string[] = [];

  piscina: boolean = false;
  trastero: boolean = false;
  garaje: boolean = false;
  gimnasio: boolean = false;

  totalImageSizeMB: number = 0

  constructor(private http:HttpClient) { }

  // Convierte bytes a megabytes
  private bytesToMB(bytes: number): number {
    return bytes / (1024 * 1024);
  }

  private fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

  // Maneja el envío del formulario
  async onSubmit(form: NgForm): Promise<void> {
    if (form.valid) {

      const base64Images = await Promise.all(
        this.imagenes.map(file => this.fileToBase64(file))
      );
   
      const postData = {
        datosCliente: {
          nombre: form.value.nombre,
          apellido: form.value.apellido,
          documento: form.value.documento,
          correo: form.value.correo,
          telefono: form.value.telefono
        },
        datosPropiedad: {
          titulo: form.value.titulo,
          descripcion: form.value.descripcion,
          precio: form.value.precio,
          tipo: form.value.tipo,
          habitaciones: form.value.habitaciones,
          banos: form.value.banos,
          ubicacion: form.value.ubicacion,
          orientacion: form.value.orientacion,
          piscina: this.piscina,
          trastero: this.trastero,
          garaje: this.garaje,
          gimnasio: this.gimnasio
        },
        fotos: base64Images
      };

      
      this.http.post('http://localhost:8000/api/publicar-propiedad/', postData)
        .subscribe(response => {
          console.log('Dato enviado con éxito', response);
          form.resetForm();
          this.imagenes = [];
          this.imagePreviews = [];

        }, error => {
          console.error('Error al enviar el dato', error);
          alert('Hubo un error al enviar el formulario. Por favor, intente de nuevo.');
        });
      
    }
  }

  

 onFileSelected(event: Event): void {
  const fileInput = event.target as HTMLInputElement;
  if (fileInput && fileInput.files) {
    this.imagenes = Array.from(fileInput.files);
    this.imagePreviews = [];
    
    // Calcular el tamaño total de las imágenes
    this.totalImageSizeMB = this.imagenes.reduce((total, file) => total + file.size, 0);
    this.totalImageSizeMB = this.bytesToMB(this.totalImageSizeMB);

    this.imagenes.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreviews.push(reader.result as string);
      };
      reader.readAsDataURL(file);
    });
    }
}

}
