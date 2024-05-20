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
    title = 'magma-angular';
    datosFacturacion: any = {};
    captchaToken!: string;
    captchaResuelto: boolean= false;
    contactoFormSubmitted: boolean = false;
    campoInvalido = {
    nombre: false,
    email: false,
    message: false,
  };

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
