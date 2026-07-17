import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, computed } from '@angular/core';
import { map, tap } from 'rxjs';
import { Router } from '@angular/router'

import { ApiResponseInterface, LoginRequestInterface, AuthResponseInterface, UserRoleType } from '@sistem/core/models';
import { environment } from '@sistem/environments/environment';



interface SessionInfo {
  email: string;
  name: string;
  role: UserRoleType;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #httpClient = inject(HttpClient);
  #router = inject(Router);
  #endpointBase = `${environment.apiUrl}/auth`;

  #accessToken = signal<string | null>(null);
  #sessionInfo = signal<SessionInfo | null>(null);

  isAuthenticated = computed(() => !!this.#accessToken());
  currentUser = this.#sessionInfo.asReadonly();

  login$(request: LoginRequestInterface) {
    return this.#httpClient
      .post<ApiResponseInterface<AuthResponseInterface>>(`${this.#endpointBase}/login`, request, { withCredentials: true })
      .pipe(tap((response) => this.#applySession(response)));
  }

  refresh$() {
    return this.#httpClient
      .post<ApiResponseInterface<AuthResponseInterface>>(`${this.#endpointBase}/refresh`, {}, { withCredentials: true })
      .pipe(tap((response) => this.#applySession(response)));
  }

  logout$() {
    return this.#httpClient
      .post<ApiResponseInterface<boolean>>(`${this.#endpointBase}/logout`, {}, { withCredentials: true })
      .pipe(
        tap(() => this.#clearSession()),
        map((response) => response.data ?? true)
      );
  }

  getToken(): string | null {
    return this.#accessToken();
  }

  #applySession(response: ApiResponseInterface<AuthResponseInterface>): void {
    if (!response.isSuccess || !response.data) return;

    this.#accessToken.set(response.data.accessToken);
    this.#sessionInfo.set({
      email: response.data.email,
      name: response.data.name,
      role: response.data.role
    });
  }

  #clearSession(): void {
    this.#accessToken.set(null);
    this.#sessionInfo.set(null);
    this.#router.navigate(['/login']);
  }
}