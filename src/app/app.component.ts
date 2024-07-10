import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FacturacionServiceService } from 'src/assets/Facturacion-service/facturacion-service.service';
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
  modalTitle = '';
  modalContent = '';

  teachers = [
    {
      id: 1,
      name: 'Miriam Díaz Rodríguez',
      image: '../assets/img/3.png',
      description: `Mtra en Ciencias.\n
                    Cinvestav, Unidad Guadalajara\n
                    PTC. Doctorante de Ingenieria en Sistemas Computacionales. Maestra en Ciencias en Ingeniería Eléctrica por el CINVESTAV-IPN en Guadalajara. Sus áreas de investigación son sistemas de eventos discretos, teoría computacional, minería de procesos. Tiene publicaciones en conferencias nacionales e internacionales y 21 direcciones de tesis de maestría terminadas. Lider del cuerpo académico Sistemas y Tecnologías Emergentes Clave ITESDZ-CA-2 desde Octubre del 2016`
    },
    {
      id: 2,
      name: 'Miguel Bernal Marin',
      image: '../assets/img/7.png',
      description: `PTC. Candidato del SNII. Miguel Bernal Marin estudió la licenciatura en matemáticas en la Universidad de Guadalajara, después ingresó a la maestría en ciencias de la computación en el Centro de Investigación y de Estudios Avanzados del IPN (CINVESTAV) unidad Guadalajara, en donde también realizó su doctorado en ciencias con especialidad en robótica y visión computacional.\nActualmente Miguel está trabajando en la compañía Intel en el proyecto de Clear Linux, manteniendo el kernel de Linux para esta distribución y dando soporte a la misma. También es docente del Instituto Tecnológico Superior de Jalisco "Mario Molina Pasquel y Henriquez" unidad Zapopan, dando clases en la Ingenieria en Sistemas computacionales y en la maestría de sistemas computacionales.\nProfesor PTC. Especilista en Robótica y visión computacional.\n3 patente\n1 capítulo\n4 asesorías de proyectos\n6 artículos\n4 conferencias\n20 Contribuciones con software libre

                    `
    },
    {
      id: 3,
      name: 'Dr. Paulo López Meyer',
      image: '../assets/img/2.png',
      description: `El Dr. Paulo Lopez Meyer recibió su título de Licenciado en Ingeniería en Telecomunicaciones en el 2003, y su grado de Maestro en Ingeniería en Instrumentación en el 2005, ambos por parte de la Universidad Nacional Autónoma de México, en la Ciudad de México. Como parte de su formación académica, recibió el grado de Doctor en Ingeniería Eléctrica y Ciencias de la Computación por parte de la Universidad de Clarkson en el 2010, en Potsdam, Nueva York, EE. UU., donde trabajó en el desarrollo de diferentes sensores biomédicos inteligentes.\nDesde 2010 hasta 2012, trabajó como investigador postdoctoral en la Universidad de Alabama, en Tuscaloosa, Alabama, continuando su investigación en el campo biomédico. A principios de 2013, comenzó a trabajar en Intel Labs en Guadalajara, México, como Científico de Investigación, enfocándose en investigación y desarrollo relacionados con la inteligencia artificial y su aplicación en audio. Actualmente, trabaja en investigación y desarrollo de proyectos de Intel, aplicando ciencia de datos e inteligencia artificial a problemas relacionados con la validación eléctrica.\nComo parte de su carrera académica, el Dr. López Meyer es actualmente miembro del SNI del CONAHCyT, y ha contribuido a más de 60 artículos en conferencias y publicaciones de prestigio internacional, así como ha colaborado en el desarrollo de más de 50 aplicaciones de patente, de las cuales 43 ya han sido otorgadas a la fecha. Sus intereses de investigación incluyen la aplicación del análisis de datos, procesamiento de señales, inteligencia artificial, aprendizaje de máquinas, y técnicas reconocimiento de patrones para la solución de problemas del mundo real.`
    },
    {
      id: 4,
      name: 'Dr. David Gómez Gutiérrez',
      image: '../assets/img/6.png',
      description: `(PTP, SNI 2) obtuvo el grado de doctor por parte de Cinvestav, Unidad Guadalajara en 2014, actualmente es miembro del sistema nacional de investigadores (SNI) Nivel 2 con adscripción, desde febrero del 2022, con el Instituto Tecnológico José Mario Molina Pasquel y Henríquez, Unidad Académica Zapopan.\nAdemás, desde diciembre del 2011, trabaja como investigador en robótica y sistemas inteligentes en Intel Labs, Intel Corporation donde cuenta con más de 30 patentes otorgadas en países como Estados Unidos, Taiwán, China, Singapur y Japón.\nEl Dr. Gómez es miembro Senior del IEEE y ha publicado más de 30 artículos científicos en revistas JCR en el área de sistemas inteligentes y control automático. Ha dirigido 6 tesis de maestría y 3 tesis de doctorado. En 2022 fue asesor de la tesis doctoral que obtuvo el premio a la mejor tesis doctoral en el área de Ingeniería y Tecnología por parte la de la Academia Mexicana de Ciencias.
      `
    },
    {
      id: 5,
      name: 'Federico A. Arias Zambrano',
      image: '../assets/img/4.png',
      description: ``
    },
    {
      id: 6,
      name: 'Dr. Leobardo Campos Macías',
      image: '../assets/img/6.png',
      description: `(PTP, SNI 1) recibió el título de Ingeniero en Telecomunicaciones en 2003 y el título de Maestro en Ingeniería de Instrumentación en 2005, ambos de la Universidad Nacional Autónoma de México, en CDMX.\nObtuvo el grado de Doctor en Ingeniería Eléctrica e Informática en 2010 en la Universidad de Clarkson, ubicada en Potsdam, Nueva York, donde trabajó en el desarrollo de varios sensores biomédicos.\nDesde 2010 hasta 2012, trabajó en una estancia postdoctoral en la Universidad de Alabama, en Tuscaloosa, Alabama, continuando su investigación en el campo biomédico.\nA principios de 2013, comenzó a trabajar en Intel Labs en Guadalajara, México, como Científico de Investigación realizando actividades de investigación y desarrollo relacionadas con la inteligencia artificial y el aprendizaje automático.\nActualmente, es Ingeniero de Validación de Software de Sistemas, trabajando en la aplicación de la ciencia de datos y la inteligencia artificial en problemas aplicados a la validación eléctrica de memorias y procesadores.\nComo parte de su carrera académica, es miembro actual del SNI de CONAHCyT, ha contribuido en la publicación de más de 60 artículos en diversas conferencias y revistas de renombre internacional, y ha participado en el desarrollo de 50 solicitudes de patentes en Intel, de las cuales 34 ya han sido otorgadas a la fecha.\nSus intereses de investigación incluyen la aplicación de análisis de datos, procesamiento de señales, técnicas de aprendizaje automático y reconocimiento de patrones en la solución de problemas de la vida real.
      `
    },
    {
      id: 7,
      name: 'Mtro. Alejandro Aguilar Cornejo',
      image: '../assets/img/6.png',
      description: `PTC . Profesor de Ciencias Computacionales en la Ingeniería en Sistemas Computacionales, especializado en el uso de la lógica matemática en la ingeniería para la especificación y verificación formal de sistemas de cómputo, tecnologías de la Información, algoritmia, teoría computacional y procesamiento de lenguajes.\nCuenta con proyectos de Investigación artículos de difusión asesor de residencias.\nPerfil Prodep y miembro del cuerpo académico Sistemas y Tecnologías Emergentes ITESDZ-CA-2.
`
    },
    {
      id: 8,
      name: 'Mtro. Miguel Leon Ramos Corchado',
      image: '../assets/img/1.png',
      description: `(PTC) obtuvo el grado de Maestro por parte de ALINNCO en el 2021, actualmente es perfil deseable del programa para el desarrollo profesional docente (PRODEP) con adscripción, desde octubre del 2008, con el Instituto Tecnológico José Mario Molina Pasquel y Henríquez, Unidad Académica Zapopan.\nAdemás, desde septiembre del 2015 es miembro del Clúster Robótica México, y contar diferentes certificaciones como: Profesional en Dirección de Proyectos (PMP), Gestión de Proyectos de Google, Certified Scrum Product Owner (CSPO), profesional de Análisis de Datos de Google.\nMiembro del Cuerpo Académico en Consolidación con Clave ITESDZ-CA-2 desde octubre del 2016.

`
    },
    {
      id: 9,
      name: 'José Antonio Aviña Méndez',
      image: '../assets/img/5.png',
      description: `El Dr. Aviña posee un Doctorado en Sistemas Computacionales por la Universidad del Sur y está cursando un MPhil/Ph.D. en Intelligent Agents en la University of Southampton, Inglaterra.\n
      Es Maestro en Sistemas de Información por el C.U.C.E.I. de la UdeG y cuenta con una Ingeniería en Computación por la UNIVA.\n
      Actualmente, es docente investigador en el Tecnológico Superior de Jalisco. Sus áreas de interés incluyen Quantum Machine Learning, Bio-inspired Machine Learning, Data Science y Artificial Intelligence.\n
      Ha publicado más de 80 artículos científicos y ha dictado 16 conferencias en los últimos dos años sobre temas como Quantum Machine Learning y Generative Artificial Intelligence.\n
      Colaboró con la Fuerza Aérea Mexicana y el sector productivo en proyectos financiados por la SEDENA, CONACyT y COECyTJAL.\n
      Anteriormente, fue Coordinador de Investigación, Innovación y Desarrollo Tecnológico en la Secretaría de Innovación Ciencia y Tecnología de Jalisco, y ha desarrollado soluciones para Robótica Didáctica.`
    },
    {
      id: 10,
      name: 'Dr. Eduardo Ulises Moya Sanchez',
      image: '../assets/img/6.png',
      description: `(PTP SNI 1), Pionero en el campo de la IA dentro de la administración pública en México.\nActualmente encabeza iniciativas de IA con diseño responsable y ético en el gobierno de Jalisco.\nVarios de sus proyectos han sido reconocidos internacionalmente por OCDE-GPAI (2020 y 2023) y por el Global Top 100 UNESCO IRCAI 2023 (seleccionado dentro del top 10).\nAntes de su cargo actual, Ulises fue investigador postdoctoral en el grupo de inteligencia artificial de alto rendimiento del Barcelona Supercomputing Center.\nTiene un Doctorado por el CINVESTAV con una estancia en el laboratorio de matemáticas aplicadas de la Rochelle, maestría en física médica por la UNAM y es físico por la Universidad de Guadalajara.\nSus distinciones más importantes son el Diploma Juan Manuel Lozano por el Instituto de Física de la UNAM.\nAdemás, recibió la beca Fulbright García-Robles, realizando una estancia en UT-Dallas y en el UT Southwestern Medical Center.\nComo mentor, ha ganado varios campeonatos de robótica, tales como el primer y el segundo lugar en Robocup Junior Superteam en Países Bajos y China.\nEn el ámbito de investigación.\n40 conferencias internacionales\n7 tesis dirigidas maestría\n1 tesis co-dirigidas doctorado\n6 capítulos de libro
`
    }
  ];

  openModal(idOrContent: number | string, title?: string): void {
    if (typeof idOrContent === 'number') {
      const teacher = this.teachers.find(t => t.id === idOrContent);
      this.modalContent = teacher ? teacher.description : '';
      this.modalTitle = 'Perfil del docente';
    } else {
      this.modalContent = idOrContent;
      this.modalTitle = title ? title : 'Modal';
    }
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
  openProfileModal(): void {
    const profileContent = `El egresado de la Maestría en Sistemas Computacionales, será un profesionista competente capaz de proponer, diseñar, implementar y desarrollar software de cómputo ubicuo o multimedia, teniendo la habilidad para participar en equipos multidisciplinarios, en la identificación de problemas y áreas de oportunidad.\n
    Aportando propuestas de solución, mediante la aplicación de metodologías y herramientas emergentes, contribuyendo así, en la toma de decisiones para resolver eficazmente los problemas de las organizaciones privadas y públicas, utilizando tecnologías de vanguardia que cumplan con estándares internacionales.`; 
    this.openModal(profileContent, 'Perfil de Egreso');
  }

  openSkillsModal(): void {
    const skillsContent = `• Modelar, desarrollar e integrar sistemas en las áreas de multimedia y cómputo ubicuo, fundamentado en los aspectos de la investigación básica y aplicada.\n
    • Conocer las metodologías necesarias para el diseño y desarrollo de software de aplicación orientado a la solución de problemas en los rubros de información y comunicación.\n
    • Detectar áreas de innovación tecnológica que contribuyan en forma integral al avance de la generación de conocimientos y conducentemente a la comprensión de problemas complejos subyacentes a las tecnologías de información y comunicación de las empresas, así como en el desarrollo de soluciones en el contexto de la globalización económica.\n
    • Formular y evaluar proyectos administrativos que impliquen el uso de nuevas tecnologías de frontera.\n
    • Integrar grupos de trabajo multidisciplinarios de alto rendimiento que diseñen, elaboren y den seguimiento a proyectos de desarrollo tecnológico.\n
    • Tener los conocimientos del estado del arte en diversos campos relacionados con el cómputo ubicuo y multimedia.\n
    • Contribuir en la competitividad de las organizaciones haciendo recurso a propuesta alternativas de soluciones innovadoras.`; 
    this.openModal(skillsContent, 'Habilidades del Egresado');
  }

  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  @ViewChild('contacto', { static: true }) contactoForm!: NgForm;

  // constructor(private facturaService: FacturacionServiceService, private _showservice: ShowErrorService, private _fb: FormBuilder, private router: Router,) {}
  // ngOnInit() {

  //   this.datosFacturacion = this._fb.group({
  //     nombre: [null, Validators.required],
  //     email: [null, Validators.email],
  //     message: [null, Validators.required],

  //   });

  // }
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
  // onSubmit() {
  //   if (this.captchaResuelto && !this.datosFacturacion.invalid) {
  //     this._showservice.showLoading()
  //     this.facturaService
  //       .enviarDatosFacturacion(this.datosFacturacion, this.captchaToken)
  //       .then(
  //         (response) => {
  //           this._showservice.hideLoading()
  //           this._showservice.success("Correo enviado correctamente.")
  //           setTimeout(() => {
  //             window.location.reload()
  //           }, 1000);
  //         },
  //         (error) => {
  //           this._showservice.hideLoading()
  //           this._showservice.statusCode(error)
  //           setTimeout(() => {
  //             window.location.reload()
  //           }, 1000);
  //         }
  //       );
  //   }
  //   else
  //   {
  //     this._showservice.nosuccess("Porfavor revisa que el capo de Email(ejemplo@correo.com)")
  //   }
  // }

  // onHcaptchaSubmit(event: any) {
  //   this.captchaResuelto = true;
  //   this.captchaToken = event;
  // }
}
