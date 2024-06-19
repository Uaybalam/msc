// import { NumberSymbol } from '@angular/common';
// import { HttpErrorResponse } from '@angular/common/http';
// import { Injectable } from '@angular/core';


// @Injectable({
//   providedIn: 'root',
// })
// export class ShowErrorService {
//   constructor() {}

//   statusCode = (error: HttpErrorResponse) => {
//     if (Number(error.status) === 0)
//       this.ConnectionReused(String(error.message));
//     else if (Number(error.status) === 404)
//       this.NotFound(String(error.error.message));
//     else if (Number(error.status) === 400)
//       this.BadRequest(String(error.error.message));
//     else if (Number(error.status) === 401)
//       this.Unauthorized(String(error.message));
//     else if (Number(error.status) === 409)
//       this.Conflict(String(error.error.message));
//     else this.UnconrolledError(String(error.message));
//   };

  // success = (message: string) => {
  //   Swal.fire({
  //     // title: '404. Not Found',
  //     text: message,
  //     icon: 'success',
  //     backdrop: false,
  //     position: 'top',
  //   });
  // };
  // nosuccess = (message: string) => {
  //   Swal.fire({
  //     // title: '404. Not Found',
  //     text: message,
  //     icon: 'question',
  //     backdrop: false,
  //     position: 'top',
  //   });
  // };


// showLoading() {
//   const options: SweetAlertOptions = {
//     title: 'Cargando datos, por favor espere...',
//     allowOutsideClick: false,
//     didOpen: () => {
//       Swal.showLoading();
//     }
//   };

//   Swal.fire(options);
// }

// hideLoading() {
//   Swal.close();
// }

//   NotAccessible = () => {
//     Swal.fire(
//       'Sección no accesible.\n Usted no cuenta con el rol necesario para\n ingresar a esta sección'
//     );
//   };

//   LoginError = () => {
//     Swal.fire('Usuario no encontrado en la base de datos');
//   };

//   private NotFound = (error: string) => {
//     Swal.fire({
//       // title: '404. Not Found',
//       text: error,
//       icon: 'question',
//       backdrop: false,
//       position: 'top',
//     });
//   };

//   private BadRequest = (error: string) => {
//     Swal.fire({
//       // title: '400. Bad Request',
//       text: `Por favor pongase en contacto con soporte (400). Error: ${error}`,
//       icon: 'question',
//       backdrop: false,
//       position: 'top',
//     });
//   };

//   private ConnectionReused = (error: string) => {
//     Swal.fire({
//       // title: '0. Error Connection Refused',
//       text: `Por favor pongase en contacto con soporte (ConnectionReused). Error: ${error}`,
//       icon: 'question',
//       backdrop: false,
//       position: 'top',
//     });
//   };

//   private Unauthorized = (error: string) => {
//     Swal.fire({
//       // title: '401 Unauthorized',
//       text: `No autorizado. Error: ${error}`,
//       icon: 'question',
//       backdrop: false,
//       position: 'top',
//     });
//   };

//   private UnconrolledError = (error: string) => {
//     Swal.fire({
//       title: 'Uncontrolled error',
//       text: `Por favor pongase en contacto con soporte (UnconrolledError). Error: ${error}`,
//       icon: 'question',
//       backdrop: false,
//       position: 'top',
//     });
//   };

//   private Conflict = ( error: string ) => {
//     Swal.fire({
//       // title: 'Uncontrolled error',
//       text: `${error}`,
//       icon: 'info',
//       backdrop: false,
//       position: 'top',
//     });
//   }
// }
