import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-pago-plux',
  templateUrl: './pago-plux.component.html',
  styleUrls: ['./pago-plux.component.css']
})
export class PagoPluxComponent implements OnInit, AfterViewInit {

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private http: HttpClient) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadPayboxScript();
      let intervalId = setInterval(() => {
        if (window['Paybox']) {
          clearInterval(intervalId);
          this.configurePaybox();  
        } else {
          console.log('Esperando que la función Paybox esté disponible...');
        }
      }, 1000);
    }
  }

  loadPayboxScript() {
    const script = document.createElement('script');
    script.src = 'https://sandbox-app.pagoplux.com/paybox/NGFhOTNiODAtNTc3Zi0xMWViLWFkZDgtODNmYzkwYWUxNDZj'; // URL del script de sandbox
    script.type = 'text/javascript';
    script.onload = () => {
      console.log("Script cargado exitosamente");
      this.initializePaybox(); 
    };
    script.onerror = (error) => {
      console.error("Error al cargar el script de PagoPlux:", error);
    };
    document.head.appendChild(script);
  }

  initializePaybox() {
    if (typeof window['Paybox'] !== 'undefined') {
      this.configurePaybox(); 
    } else {
      console.log("Esperando que la función Paybox esté disponible...");
      setTimeout(() => this.initializePaybox(), 1000); 
    }
  }
  
  configurePaybox(): void {
    if (isPlatformBrowser(this.platformId)) {
      const win = window as any;

      if (win['Paybox']) {
        const data = {
          PayboxRemail: "dmorales@pagoplux.com",
          PayboxSendmail: "correocliente@gmail.com",
          PayboxRename: "Nombre Negocio",
          PayboxBase0: "2.0",
          PayboxBase12: "10.0",
          PayboxDescription: "Descripción del pago",
          PayboxLanguage: "es",
          PayboxDirection: "Dirección del cliente",
          PayBoxClientPhone: "0999999999",
          PayboxProduction: false,
          PayboxEnvironment: "sandbox",
          PayboxPagoPlux: true,
          PayboxIdElement: "ButtonPaybox"
        };

        try {
          win['Paybox'](data);
        } catch (error) {
          console.error('Error al ejecutar la función Paybox:', error);
        }
      }
    }
  }

  createTransaction() {
    const url = 'https://api.pagoplux.com/intv1/integrations/createTransactionWhatsappResource';
  
    const idCliente = 'o3NXHGmfujN3Tyzp1cyCDu3xst';  
    const claveSecreta = 'TkBhZQP3zwMyx3JwC5HeFqzXM4p0jzsXp0hTbWRnI4riUtJT';  
  
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(`${idCliente}:${claveSecreta}`),  
      'Content-Type': 'application/json'
    });
  
    const body = {
      "montoCero": 2,
      "monto12": 3,
      "whatsapp": "+593993778542",
      "descripcion": "link de cobro",
      "ci": "1710010002",
      "direccion": "Vencedores y Acacias",
      "nombrePago": "Nombre Cliente",
      "emailPago": "email_cliente",
      "telefono": "telef_cliente"
    };

    this.http.post(url, body, { headers: headers }).subscribe(
      (response: any) => {
        if (response && response.code === 0) {
          console.log('Respuesta exitosa:', response);  
        } else {
          console.error('Error en la respuesta:', response);  
        }
      },
      (error: any) => {
        console.error('Error en la solicitud:', error);  
      }
    );
    
  }
}
