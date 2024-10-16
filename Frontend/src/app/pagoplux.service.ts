import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../app/enviroment';

declare var Paybox: any;

@Injectable({
  providedIn: 'root'
})
export class PagoPluxService {
  private apiUrl = 'https://api.pagoplux.com/intv1/'; // Cambia a 'https://apipre.pagoplux.com/intv1/' para sandbox
  private credentials = `${environment.pagopluxIdCliente}:${environment.pagopluxClaveSecreta}`;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(this.credentials)
    });
  }

  generatePaymentLink(paymentData: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}integrations/createTransactionWhatsappResource`,
      paymentData,
      { headers: this.getHeaders() }
    );
  }

  getTransactionState(idTransaction: string): Observable<any> {
    return this.http.get(
      `${this.apiUrl}integrations/getTransactionByIdStateResource?idTransaction=${idTransaction}`,
      { headers: this.getHeaders() }
    );
  }

  getTransactionByConsumptionCode(consumptionCode: string, idEstablishment: string): Observable<any> {
    return this.http.get(
      `${this.apiUrl}integrations/getTransactionByIdStateResource?consumptionCode=${consumptionCode}&idEstablishment=${idEstablishment}`,
      { headers: this.getHeaders() }
    );
  }

  initializePayment(paymentData: any): Observable<any> {
    return new Observable(observer => {
      if (typeof Paybox !== 'undefined') {
        Paybox.init({
          payboxApiKey: environment.pagopluxIdCliente,
          payboxSecret: environment.pagopluxClaveSecreta,
          payboxEnvironment: 'TEST', // Cambia a 'LIVE' para producción
          payboxIdClient: environment.pagopluxIdCliente,
          ...paymentData
        });

        Paybox.open({
          onSuccess: (response: any) => {
            observer.next({ success: true, response });
            observer.complete();
          },
          onCancel: () => {
            observer.next({ success: false, reason: 'cancelled' });
            observer.complete();
          },
          onError: (error: any) => {
            observer.error(error);
          }
        });
      } else {
        observer.error('Paybox no está disponible');
      }
    });
  }

  // Método para cifrar datos sensibles usando la clave pública
  encryptData(data: string): string {
    // Aquí deberías implementar la lógica de cifrado usando la clave pública
    // Por ejemplo, podrías usar la librería JSEncrypt
    // Esta es una implementación ficticia, deberás reemplazarla con la real
    console.warn('Método de cifrado no implementado');
    return btoa(data); // Esto es solo un placeholder, no es un cifrado real
  }
}