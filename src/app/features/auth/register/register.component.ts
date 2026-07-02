import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { GoogleSignInButtonComponent } from '../../../shared/controls/google-sign-in-button/google-sign-in-button.component';

@Component({
  selector: 'sistem-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, GoogleSignInButtonComponent],
  templateUrl: './register.component.html'
})
export default class RegisterComponent {
  #formBuilder = inject(FormBuilder);
  #authService = inject(AuthService);
  #router = inject(Router);

  loading = signal(false);
  errorMessage = signal<string | null>(null);

  formGroup = this.#formBuilder.nonNullable.group({
    fullName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  submit(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.errorMessage.set(null);

    this.#authService.register$(this.formGroup.getRawValue()).subscribe((response) =>
      this.#handleAuthResult(response.isSuccess, response.errors, 'No se pudo crear la cuenta.'));
  }

  onGoogleCredential(idToken: string): void {
    this.loading.set(true);
    this.errorMessage.set(null);

    this.#authService.loginWithGoogle$({ idToken }).subscribe((response) =>
      this.#handleAuthResult(response.isSuccess, response.errors, 'No se pudo continuar con Google.'));
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
