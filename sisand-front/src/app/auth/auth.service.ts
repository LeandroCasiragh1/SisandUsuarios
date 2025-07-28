import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { isBrowser } from '../utils/is-browser';
import { throwError, catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:7199/api/Auth';

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, senha: string) {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, senha }).pipe(
      tap((resposta) => {
        const token = resposta?.token;
        if (token) {
          this.salvarToken(token);
        }
      }),
      catchError((erro) => {
        console.error('Erro no AuthService:', erro);
        return throwError(() => erro);
      })
    );
  }

  salvarToken(token: string) {
    localStorage.setItem('token', token);
  }

  obterToken(): string | null {
    return isBrowser() ? localStorage.getItem('token') : null;
  }

  estaLogado(): boolean {
    return !!this.obterToken();
  }

  logout() {
    if (isBrowser()) {
      localStorage.removeItem('token');
    }
    this.router.navigate(['/login']);
  }
}
