import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';  
import { AppRoutingModule } from './app-routing.module';  

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PagoPluxComponent } from './pago-plux/pago-plux.component';
import { PagoPluxService } from './pagoplux.service';  

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PagoPluxComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,  
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [PagoPluxService],
  bootstrap: [AppComponent]
})
export class AppModule { }
