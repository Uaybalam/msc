import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FacturacionServiceService } from 'src/assets/Facturacion-service/facturacion-service.service';
import { ShowErrorService } from './show-error/show-error.service';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import 'owl.carousel';
declare var jQuery: any; // Declarar jQuery para evitar errores de tipo
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
    title = 'msc';
    datosFacturacion: any = {};
    captchaToken!: string;
    captchaResuelto: boolean= false;
    contactoFormSubmitted: boolean = false;
    campoInvalido = {
    nombre: false,
    email: false,
    message: false,
  };

  isModalOpen = false;
  modalContent = '';

  teachers = [
    {
      id: 1,
      name: 'Miriam Díaz Rodríguez',
      image: '../assets/img/academico-1.webp',
      description: ''
    },
    {
      id: 2,
      name: 'Miguel Bernal Marin',
      image: '../assets/img/academico-2.webp',
      description: `Perfil del profesor
                    Doctorado en Ciencias. Especilista en Robótica y visión computacional.
                    Cinvestav, Unidad Guadalajara
                    Candidato SNII
                    Colaborador INTEL
                     
                    
                    PTC. Candidato del SNII. Miguel Bernal Marin estudió la licenciatura en matemáticas en la Universidad de Guadalajara, después ingresó a la maestría en ciencias de la computación en el Centro de Investigación y de Estudios Avanzados del IPN (CINVESTAV) unidad Guadalajara, en donde también realizó su doctorado en ciencias con especialidad en robótica y visión computacional. Actualmente Miguel está trabajando en la compañía Intel en el proyecto de Clear Linux, manteniendo el kernel de Linux para esta distribución y dando soporte a la misma. También es docente del Instituto Tecnológico Superior de Jalisco "Mario Molina Pasquel y Henriquez" unidad Zapopan, dando clases en la Ingenieria en Sistemas computacionales y en la maestría de sistemas computacionales.
                    Profesor PTC. Especilista en Robótica y visión computacional.
                    3 patente
                    1 capítulo
                    4 asesorías de proyectos
                    6 artículos
                    4 conferencias
                    20 Contribuciones con software libre
                    `
    },
    {
      id: 3,
      name: 'Federico A. Arias Zambrano',
      image: '../assets/img/academico-3.webp',
      description: ''
    },
    {
      id: 4,
      name: 'José Antonio Aviña Méndez',
      image: '../assets/img/academico-4.webp',
      description: ''
    },
    {
      id: 5,
      name: 'Adriana Tovar Arriaga',
      image: '../assets/img/academico-5.webp',
      description: `Profesora
                    Ingeniera en Sistemas Computacionales, tras años de experiencia en el área industrial automotriz, decidí dar un giro a mi carrera para orientarme a la educación en ingeniería en la cuál tengo 14 años de experiencia. Estoy convencida que es la educación, investigación y desarrollo de tecnología propia llevaría a un progreso real y competitivo a nuestro país.`
    }
  ];

  openModal(id: number) {
    const teacher = this.teachers.find(t => t.id === id);
    this.modalContent = teacher ? teacher.description : '';
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    console.log("si prende esta madre we")
  }

  @ViewChild('contacto', { static: true }) contactoForm!: NgForm;

  constructor(private facturaService: FacturacionServiceService, private _showservice: ShowErrorService, private _fb: FormBuilder, private router: Router,) {}
  ngOnInit() {

    this.datosFacturacion = this._fb.group({
      nombre: [null, Validators.required],
      email: [null, Validators.email],
      message: [null, Validators.required],

    });

  }
  ngAfterViewInit() {
    jQuery('#owl-carousel2').owlCarousel({
      items: 1, // Número de elementos a mostrar
      loop: true, // Repetir el carrusel de forma infinita
      nav: true, // Mostrar las flechas de navegación
      dots: false,
      autoplay: true, // Activar la reproducción automática
      autoplayTimeout: 5000, // Duración de cada diapositiva en milisegundos
      responsive: {
        0: {
          items: 1 // Número de elementos a mostrar en pantalla pequeña
        },
        768: {
          items: 1 // Número de elementos a mostrar en pantalla mediana
        },
        992: {
          items: 1 // Número de elementos a mostrar en pantalla grande
        }
      }
    });
    jQuery('#owl-carousel').owlCarousel({
      items: 3, // Número de elementos a mostrar
      loop: true, // Repetir el carrusel de forma infinita
      autoplay: true, // Activar la reproducción automática
      autoplayTimeout: 5000, // Duración de cada diapositiva en milisegundos
      responsive: {
        0: {
          items: 1 // Número de elementos a mostrar en pantalla pequeña
        },
        768: {
          items: 1 // Número de elementos a mostrar en pantalla mediana
        },
        992: {
          items: 3 // Número de elementos a mostrar en pantalla grande
        }
      }
    });
    jQuery('#owl-carousel1').owlCarousel({
      items: 3, // Número de elementos a mostrar
      loop: true, // Repetir el carrusel de forma infinita
      autoplay: true, // Activar la reproducción automática
      dots: false,
      autoplayTimeout: 5000, // Duración de cada diapositiva en milisegundos
      responsive: {
        0: {
          items: 1 // Número de elementos a mostrar en pantalla pequeña
        },
        768: {
          items: 1 // Número de elementos a mostrar en pantalla mediana
        },
        992: {
          items: 3 // Número de elementos a mostrar en pantalla grande
        }
      }
    });
  }
  onSubmit() {
    if (this.captchaResuelto && !this.datosFacturacion.invalid) {
      this._showservice.showLoading()
      this.facturaService
        .enviarDatosFacturacion(this.datosFacturacion, this.captchaToken)
        .then(
          (response) => {
            this._showservice.hideLoading()
            this._showservice.success("Correo enviado correctamente.")
            setTimeout(() => {
              window.location.reload()
            }, 1000);
          },
          (error) => {
            this._showservice.hideLoading()
            this._showservice.statusCode(error)
            setTimeout(() => {
              window.location.reload()
            }, 1000);
          }
        );
    }
    else
    {
      this._showservice.nosuccess("Porfavor revisa que el capo de Email(ejemplo@correo.com)")
    }
  }

  onHcaptchaSubmit(event: any) {
    this.captchaResuelto = true;
    this.captchaToken = event;
  }
}
