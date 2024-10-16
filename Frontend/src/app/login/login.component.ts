import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';  // Asegúrate de que la ruta es correcta

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  contrasenia: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

  login(): void {
    const loginData = {
      usuario: this.username,
      contrasenia: this.contrasenia
    };

    this.http.post('http://127.0.0.1:8080/api/auth/login', loginData).subscribe(
      (response: any) => {
        console.log(response);
        this.authService.setToken(response.token);  // Guarda el token de autenticación
        this.router.navigate(['/pagoPlux']);  // Redirige a PagoPlux
      },
      (error) => {
        this.errorMessage = error.error.message || 'Error al iniciar sesión';
      }
    );
  }
}
