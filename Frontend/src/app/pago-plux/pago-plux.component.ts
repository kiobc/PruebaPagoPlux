import { Component, OnInit } from '@angular/core';
import { PagoPluxService } from '../pagoplux.service';
import { environment } from '../enviroment';
declare var Paybox: any;
@Component({
  selector: 'app-pago-plux',
  templateUrl: './pago-plux.component.html',
  styleUrls: ['./pago-plux.component.css']
})
export class PagoPluxComponent implements OnInit {
  paymentLink: string = '';
  transactionId: string = '';
  transactionState: string = '';
  errorMessage: string = '';

  constructor(private pagoPluxService: PagoPluxService) {}

  ngOnInit() {
    if (typeof Paybox === 'undefined') {
      console.error('Paybox no está definido. Asegúrate de que el script de PagoPlux se haya cargado correctamente.');
    }
  }

  generatePaymentLink() {
    const paymentData = {
      montoCero: 0,
      monto12: 11.00,
      whatsapp: "+593993778542",
      descripcion: "Pago desde Angular",
      ci: "1710010002",
      direccion: "Vencedores y Acacias",
      nombrePago: "Nombre Cliente",
      emailPago: "email_cliente@ejemplo.com",
      telefono: "+593993778542"
    };

    this.pagoPluxService.generatePaymentLink(paymentData).subscribe(
      response => {
        if (response.code === 0) {
          this.paymentLink = response.detail.url;
          this.transactionId = this.extractTransactionId(this.paymentLink);
          console.log('Link de pago generado:', this.paymentLink);
        } else {
          this.errorMessage = 'Error al generar el link de pago: ' + response.description;
          console.error(this.errorMessage);
        }
      },
      error => {
        this.errorMessage = 'Error en la solicitud: ' + error.message;
        console.error(this.errorMessage);
      }
    );
  }

  checkTransactionState() {
    if (this.transactionId) {
      this.pagoPluxService.getTransactionState(this.transactionId).subscribe(
        response => {
          if (response.code === 0) {
            this.transactionState = response.detail.respuest.valor_catalogo_estado;
            console.log('Estado de la transacción:', this.transactionState);
          } else {
            this.errorMessage = 'Error al obtener el estado de la transacción: ' + response.description;
            console.error(this.errorMessage);
          }
        },
        error => {
          this.errorMessage = 'Error en la solicitud: ' + error.message;
          console.error(this.errorMessage);
        }
      );
    } else {
      this.errorMessage = 'No hay ID de transacción disponible';
      console.error(this.errorMessage);
    }
  }

  initializePayment() {
    const paymentData = {
      payboxDescription: 'Descripción del pago',
      payboxAmount: 11.00,
      payboxCurrency: 'USD',
      payboxResponseUrl: 'https://tu-sitio.com/respuesta',
      payboxFinishUrl: 'https://tu-sitio.com/finalizar'
    };

    this.pagoPluxService.initializePayment(paymentData).subscribe(
      result => {
        if (result.success) {
          console.log('Pago exitoso:', result.response);
          // Aquí puedes manejar la respuesta exitosa
        } else {
          this.errorMessage = 'Pago cancelado por el usuario';
          console.log(this.errorMessage);
        }
      },
      error => {
        this.errorMessage = 'Error al inicializar el pago: ' + error.message;
        console.error(this.errorMessage);
      }
    );
  }

  private extractTransactionId(url: string): string {
    const parts = url.split('/');
    return parts[parts.length - 1];
  }

  // Ejemplo de cómo podrías usar el método de cifrado
  encryptSensitiveData() {
    const sensitiveData = 'Datos sensibles a cifrar';
    const encryptedData = this.pagoPluxService.encryptData(sensitiveData);
    console.log('Datos cifrados:', encryptedData);
  }
}