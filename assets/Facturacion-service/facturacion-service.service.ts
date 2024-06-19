import { Injectable } from '@angular/core';
import emailjs from 'emailjs-com';

@Injectable({
  providedIn: 'root'
})
export class FacturacionServiceService {

  private user_id = 'fVCGA8D7G9FunEX7B';
  private template_id = 'template_5n1tr5k';
  private service_id = 'service_87phron';

  constructor() {
    emailjs.init(this.user_id);
  }
  enviarDatosFacturacion(datosFacturacion: any, token: string) {
    console.log('Datos recibidos en el servicio:', datosFacturacion);

    const templateParams = {

      nombre: datosFacturacion.nombre,
      email: datosFacturacion.email,
      message: datosFacturacion.message,
      HcaptchaResponse: token
    };

    return emailjs.send(this.service_id, this.template_id, templateParams)
    .then((response) => {
      console.log('Respuesta de la API de EmailJS:', response);
      return response; // Puedes devolver la respuesta de la API si lo necesitas
    })
    .catch((error) => {
      console.error('Error al enviar el correo electrónico:', error);
      throw error; // Puedes manejar el error de alguna otra manera si es necesario
    });
  }
}
