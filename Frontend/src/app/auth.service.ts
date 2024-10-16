import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  // Verificar si el usuario está autenticado (si hay token guardado)
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // Guardar token después del login
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Remover token cuando el usuario cierra sesión
  logout(): void {
    localStorage.removeItem('token');
  }
}
