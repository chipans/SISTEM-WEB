import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'sistem-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html'
})
export default class LoginComponent {
  #formBuilder = inject(FormBuilder);
  #authService = inject(AuthService);
  #router = inject(Router);

  loading = signal(false);
  errorMessage = signal<string | null>(null);

  formGroup = this.#formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

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
        error: () =>
          this.errorMessage.set('Ocurrió un error de conexión. Intenta nuevamente.')
      });
  }

  #handleAuthResult(isSuccess: boolean, errors: string[] | undefined, fallbackMessage: string): void {
    if (isSuccess) {
      this.#router.navigate(['/dashboard']);
      return;
    }

    this.errorMessage.set(errors?.join(', ') ?? fallbackMessage);
  }
}