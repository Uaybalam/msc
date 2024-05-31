import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SemblanzaComponent } from './semblanza/semblanza.component';
import { AppComponent } from './app.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: AppComponent }, // Asegúrate de tener un componente Home
  { path: 'semblanza', component: SemblanzaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
