import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { GoogleSignInButtonComponent } from '../../../shared/controls/google-sign-in-button/google-sign-in-button.component';

@Component({
  selector: 'sistem-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, GoogleSignInButtonComponent],
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

    this.#authService.login$(this.formGroup.getRawValue()).subscribe((response) =>
      this.#handleAuthResult(response.isSuccess, response.errors, 'No se pudo iniciar sesión.'));
  }

  onGoogleCredential(idToken: string): void {
    this.loading.set(true);
    this.errorMessage.set(null);

    this.#authService.loginWithGoogle$({ idToken }).subscribe((response) =>
      this.#handleAuthResult(response.isSuccess, response.errors, 'No se pudo iniciar sesión con Google.'));
  }

  #handleAuthResult(isSuccess: boolean, errors: string[] | undefined, fallbackMessage: string): void {
    this.loading.set(false);

    if (isSuccess) {
      this.#router.navigate(['/dashboard']);
      return;
    }

    this.errorMessage.set(errors?.join(', ') ?? fallbackMessage);
  }
}
