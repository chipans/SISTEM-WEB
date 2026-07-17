import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@sistem/core/services';
import { ToastService } from '@sistem/shared/controls/toast-notification';

import { finalize } from 'rxjs';
import { SvgIconComponent } from "angular-svg-icon";


@Component({
  selector: 'sistem-login',
  standalone: true,
  imports: [ReactiveFormsModule, SvgIconComponent],
  templateUrl: './login.component.html'
})
export default class LoginComponent {
  #formBuilder = inject(FormBuilder);
  #authService = inject(AuthService);
  #toastService = inject(ToastService);
  #router = inject(Router);

  loading = signal(false);
  errorMessage = signal<string | null>(null);

  showPassword = signal(false);

  formGroup = this.#formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  
  togglePasswordVisibility(): void {
    this.showPassword.update((value) => !value)
  }

  submit(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.errorMessage.set(null);

    this.#authService
      .login$(this.formGroup.getRawValue())
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) =>
          this.#handleAuthResult(response.isSuccess, response.errors, 'No se pudo iniciar sesión.'),
        error: (error) => {
          const errors = error?.error?.errors as string[] | undefined;
          const message = errors?.join(', ') ?? 'Ocurrió un error de conexión. Intenta nuevamente.';

          this.errorMessage.set(message);

          this.#toastService.open('Error de acceso', message, {
            duration: 4000,
            type: 'error'
          });
        }
      });
  }

  #handleAuthResult(isSuccess: boolean, errors: string[] | undefined, fallbackMessage: string): void {
    if (isSuccess) {
      this.#toastService.open('Bienvenido', 'Inicio de sesión exitoso.', {
        duration: 3000,
        type: 'success'
      });
      this.#router.navigate(['/dashboard']);
      return;
    }

    const message = errors?.join(', ') ?? fallbackMessage;
    this.errorMessage.set(message);

    this.#toastService.open('Error de acceso', message, {
      duration: 4000,
      type: 'error'
    });
  }
}