import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Importa FormsModule
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';  // Importar withFetch
import { AppRoutingModule } from './app-routing.module';  // Asegúrate de que esté bien importado

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PagoPluxComponent } from './pago-plux/pago-plux.component';
import { PagoPluxService } from './pagoplux.service';  // Asegúrate de que esté bien importado

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PagoPluxComponent,// Asegúrate de que esté bien importado aquí
  ],
  imports: [
    BrowserModule,
    FormsModule,  // Asegúrate de que FormsModule está importado aquí
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [PagoPluxService],
  bootstrap: [AppComponent]
})
export class AppModule { }
