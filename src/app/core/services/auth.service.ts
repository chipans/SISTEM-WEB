import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, Observable, of, tap } from 'rxjs';
import { environment } from '@environments/environment';
import { ApiResponseInterface } from '../models/api-response.interface';
import {
  LoginRequestInterface,
  RegisterRequestInterface,
  GoogleLoginRequestInterface,
  AuthResponseInterface
} from '../models/auth.interface';

const TOKEN_KEY = 'sistem_auth_token';
const USER_KEY = 'sistem_auth_user';

interface StoredUserInterface {
  email: string;
  fullName: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  #http = inject(HttpClient);
  #router = inject(Router);

  #endpointBase = `${environment.apiUrl}/auth`;

  #token = signal<string | null>(localStorage.getItem(TOKEN_KEY));
  #userInfo = signal<StoredUserInterface | null>(this.#readStoredUser());

  isAuthenticated = computed(() => !!this.#token());
  currentUser = this.#userInfo.asReadonly();

  login$(request: LoginRequestInterface): Observable<ApiResponseInterface<AuthResponseInterface>> {
    return this.#http.post<ApiResponseInterface<AuthResponseInterface>>(`${this.#endpointBase}/login`, request)
      .pipe(
        tap((response) => this.#handleAuthResponse(response)),
        catchError((error: HttpErrorResponse) => of(this.#toFailureResponse(error)))
      );
  }

  register$(request: RegisterRequestInterface): Observable<ApiResponseInterface<AuthResponseInterface>> {
    return this.#http.post<ApiResponseInterface<AuthResponseInterface>>(`${this.#endpointBase}/register`, request)
      .pipe(
        tap((response) => this.#handleAuthResponse(response)),
        catchError((error: HttpErrorResponse) => of(this.#toFailureResponse(error)))
      );
  }

  loginWithGoogle$(request: GoogleLoginRequestInterface): Observable<ApiResponseInterface<AuthResponseInterface>> {
    return this.#http.post<ApiResponseInterface<AuthResponseInterface>>(`${this.#endpointBase}/google`, request)
      .pipe(
        tap((response) => this.#handleAuthResponse(response)),
        catchError((error: HttpErrorResponse) => of(this.#toFailureResponse(error)))
      );
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this.#token.set(null);
    this.#userInfo.set(null);
    this.#router.navigate(['/login']);
  }

  getToken(): string | null {
    return this.#token();
  }

  #handleAuthResponse(response: ApiResponseInterface<AuthResponseInterface>): void {
    if (!response.isSuccess || !response.data) return;

    const user: StoredUserInterface = { email: response.data.email, fullName: response.data.fullName };

    localStorage.setItem(TOKEN_KEY, response.data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    this.#token.set(response.data.token);
    this.#userInfo.set(user);
  }

  #toFailureResponse(error: HttpErrorResponse): ApiResponseInterface<AuthResponseInterface> {
    const body = error.error as ApiResponseInterface<AuthResponseInterface> | null;

    return {
      isSuccess: false,
      data: null,
      errors: body?.errors ?? ['Ocurrió un error de conexión con el servidor.']
    };
  }

  #readStoredUser(): StoredUserInterface | null {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) as StoredUserInterface : null;
  }
}
