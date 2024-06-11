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
      description: `Mtra en Ciencias.
                    Cinvestav, Unidad Guadalajara
                    PTC. Doctorante de Ingenieria en Sistemas Computacionales. Maestra en Ciencias en Ingeniería Eléctrica por el CINVESTAV-IPN en Guadalajara. Sus áreas de investigación son sistemas de eventos discretos, teoría computacional, minería de procesos. Tiene publicaciones en conferencias nacionales e internacionales y 21 direcciones de tesis de maestría terminadas. Lider del cuerpo académico Sistemas y Tecnologías Emergentes Clave ITESDZ-CA-2 desde Octubre del 2016
                    `
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
      name: 'Dr. Paulo López Meyer',
      image: '../assets/img/academico-1.webp',
      description: `Doctorado        
                    Universidad Nacional Autónoma de México
                    SNII I
                    Colaborador INTEL
                    (PTP, SNI 1) recibió el título de Ingeniero en Telecomunicaciones en 2003 y el título de Maestro en Ingeniería de Instrumentación en 2005, ambos de la Universidad Nacional Autónoma de México, en CDMX. Obtuvo el grado de Doctor en Ingeniería Eléctrica e Informática en 2010 en la Universidad de Clarkson, ubicada en Potsdam, Nueva York, donde trabajó en el desarrollo de varios sensores biomédicos. Desde 2010 hasta 2012, trabajó en una estancia postdoctoral en la Universidad de Alabama, en Tuscaloosa, Alabama, continuando su investigación en el campo biomédico. A principios de 2013, comenzó a trabajar en Intel Labs en Guadalajara, México, como Científico de Investigación realizando actividades de investigación y desarrollo relacionadas con la inteligencia artificial y el aprendizaje automático. Actualmente, es Ingeniero de Validación de Software de Sistemas, trabajando en la aplicación de la ciencia de datos y la inteligencia artificial en problemas aplicados a la validación eléctrica de memorias y procesadores. Como parte de su carrera académica, es miembro actual del SNI de CONAHCyT, ha contribuido en la publicación de más de 60 artículos en diversas conferencias y revistas de renombre internacional, y ha participado en el desarrollo de 50 solicitudes de patentes en Intel, de las cuales 34 ya han sido otorgadas a la fecha. Sus intereses de investigación incluyen la aplicación de análisis de datos, procesamiento de señales, técnicas de aprendizaje automático y reconocimiento de patrones en la solución de problemas de la vida real.



      `
    },
    {
      id: 4,
      name: 'Dr. David Gómez Gutiérrez',
      image: '../assets/img/academico-1.webp',
      description: `Doctorado
                    Centro de Investigaciones y Estudios Avanzados del Instituto Politécnico Nacional, CINVESTAV GDL
                    SNII II
                    Colaborador INTEL
                    (PTP, SNI 2) obtuvo el grado de doctor por parte de Cinvestav, Unidad Guadalajara en 2014, actualmente es miembro del sistema nacional de investigadores (SNI) Nivel 2 con adscripción, desde febrero del 2022, con el Instituto Tecnológico José Mario Molina Pasquel y Henríquez, Unidad Académica Zapopan. Además, desde diciembre del 2011, trabaja como investigador en robótica y sistemas inteligentes en Intel Labs, Intel Corporation donde cuenta con más de 30 patentes otorgadas en países como Estados Unidos, Taiwán, China, Singapur y Japón. El Dr. Gómez es miembro Senior del IEEE y ha publicado más de 30 artículos científicos en revistas JCR en el área de sistemas inteligentes y control automático. Ha dirigido 6 tesis de maestría y 3 tesis de doctorado. En 2022 fue asesor de la tesis doctoral que obtuvo el premio a la mejor tesis doctoral en el área de Ingeniería y Tecnología por parte la de la Academia Mexicana de Ciencias. 

      `
    },
    {
      id: 5,
      name: 'Federico A. Arias Zambrano',
      image: '../assets/img/academico-3.webp',
      description: ``
    },
    {
      id: 6,
      name: 'Dr. Leobardo Campos Macías',
      image: '../assets/img/academico-1.webp',
      description: `Doctorado          
                    Cinvestav, Unidad Guadalajara
                    SNII I
                    Colaborador INTEL
                    (PTP, SNI 1) recibió el título de Ingeniero en Telecomunicaciones en 2003 y el título de Maestro en Ingeniería de Instrumentación en 2005, ambos de la Universidad Nacional Autónoma de México, en CDMX. Obtuvo el grado de Doctor en Ingeniería Eléctrica e Informática en 2010 en la Universidad de Clarkson, ubicada en Potsdam, Nueva York, donde trabajó en el desarrollo de varios sensores biomédicos. Desde 2010 hasta 2012, trabajó en una estancia postdoctoral en la Universidad de Alabama, en Tuscaloosa, Alabama, continuando su investigación en el campo biomédico. A principios de 2013, comenzó a trabajar en Intel Labs en Guadalajara, México, como Científico de Investigación realizando actividades de investigación y desarrollo relacionadas con la inteligencia artificial y el aprendizaje automático. Actualmente, es Ingeniero de Validación de Software de Sistemas, trabajando en la aplicación de la ciencia de datos y la inteligencia artificial en problemas aplicados a la validación eléctrica de memorias y procesadores. Como parte de su carrera académica, es miembro actual del SNI de CONAHCyT, ha contribuido en la publicación de más de 60 artículos en diversas conferencias y revistas de renombre internacional, y ha participado en el desarrollo de 50 solicitudes de patentes en Intel, de las cuales 34 ya han sido otorgadas a la fecha. Sus intereses de investigación incluyen la aplicación de análisis de datos, procesamiento de señales, técnicas de aprendizaje automático y reconocimiento de patrones en la solución de problemas de la vida real.
      `
    },
    {
      id: 7,
      name: 'Mtro. Alejandro Aguilar Cornejo',
      image: '../assets/img/academico-1.webp',
      description: `Maestro en Ciencias en Ingeniería Eléctrica, con especialidad en Ciencias Computacionales.
                    Cinvestav, Unidad Guadalajara
                    PTC . Profesor de Ciencias Computacionales en la Ingeniería en Sistemas Computacionales, especializado en el uso de la lógica matemática en la ingeniería para la especificación y verificación formal de sistemas de cómputo, tecnologías de la Información, algoritmia, teoría computacional y procesamiento de lenguajes. Cuenta con proyectos de Investigación artículos de difusión asesor de residencias. Perfil Prodep y miembro del cuerpo académico Sistemas y Tecnologías Emergentes ITESDZ-CA-2.

`
    },
    {
      id: 8,
      name: 'Mtro. Miguel Leon Ramos Corchado',
      image: '../assets/img/academico-1.webp',
      description: `Maestría
                    Universidad Pedro de Gante/Centro de Investigaciones y Estudios Avanzados del Instituto Politécnico Nacional
                    Perfil Prodep
                    Integrante de Cuerpo Académico en Formación ITESDZ-CA-2
                     (PTC) obtuvo el grado de Maestro por parte de ALINNCO en el 2021, actualmente es perfil deseable del programa para el desarrollo profesional docente (PRODEP) con adscripción, desde octubre del 2008, con el Instituto Tecnológico José Mario Molina Pasquel y Henríquez, Unidad Académica Zapopan. Además, desde septiembre del 2015 es miembro del Clúster Robótica México, y contar diferentes certificaciones como: Profesional en Dirección de Proyectos (PMP), Gestión de Proyectos de Google, Certified Scrum Product Owner (CSPO), profesional de Análisis de Datos de Google. Miembro del Cuerpo Académico en Consolidación con Clave ITESDZ-CA-2 desde octubre del 2016.
`
    },
    {
      id: 9,
      name: 'Federico A. Arias Zambrano',
      image: '../assets/img/academico-3.webp',
      description: ``
    },
    {
      id: 10,
      name: 'José Antonio Aviña Méndez',
      image: '../assets/img/academico-4.webp',
      description: `
    `
    },
    {
      id: 11,
      name: 'Dr. Eduardo Ulises Moya Sanchez',
      image: '../assets/img/academico-1.webp',
      description: `Doctorado.
                    Especialista en Inteligencia artificial de alto rendimiento.
                    Cinvestav, Unidad Guadalajara
                    SNII I
                    Director de I.A del Estado de Jalisco
                    (PTP SNI 1), Pionero en el campo de la IA dentro de la administración pública en México. Actualmente encabeza iniciativas de IA con diseño responsable y ético en el gobierno de Jalisco. Varios de sus proyectos han sido reconocidos internacionalmente por OCDE-GPAI (2020 y 2023) y por el Global Top 100 UNESCO IRCAI 2023 (seleccionado dentro del top 10). Antes de su cargo actual, Ulises fue investigador postdoctoral en el grupo de inteligencia artificial de alto rendimiento del Barcelona Supercomputing Center. Tiene un Doctorado por el CINVESTAV con una estancia en el laboratorio de matemáticas aplicadas de la Rochelle, maestría en física médica por la UNAM y es físico por la Universidad de Guadalajara. Sus distinciones más importantes son el Diploma Juan Manuel Lozano por el Instituto de Física de la UNAM. Además, recibió la beca Fulbright García-Robles, realizando una estancia en UT-Dallas y en el UT Southwestern Medical Center. Como mentor, ha ganado varios campeonatos de robótica, tales como el primer y el segundo lugar en Robocup Junior Superteam en Países Bajos y China. En el ámbito de investigación.40 conferencias internacionales 
                    7 tesis dirigidas maestría
                    1 tesis co-dirigidas doctorado
                    6 capítulos de libro`
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
