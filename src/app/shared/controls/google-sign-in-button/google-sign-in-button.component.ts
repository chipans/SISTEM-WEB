import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { environment } from '@environments/environment';

interface GoogleCredentialResponseInterface {
  credential: string;
}

interface GoogleAccountsIdInterface {
  initialize(config: { client_id: string; callback: (response: GoogleCredentialResponseInterface) => void }): void;
  renderButton(parent: HTMLElement, options: { theme: string; size: string; width?: number; text?: string }): void;
}

declare global {
  interface Window {
    google?: { accounts: { id: GoogleAccountsIdInterface } };
  }
}

@Component({
  selector: 'sistem-google-sign-in-button',
  standalone: true,
  templateUrl: './google-sign-in-button.component.html'
})
export class GoogleSignInButtonComponent implements OnInit {
  @ViewChild('googleButtonContainer', { static: true }) buttonContainer!: ElementRef<HTMLDivElement>;
  @Output() credentialReceived = new EventEmitter<string>();

  ngOnInit(): void {
    this.#waitForGoogleScript();
  }

  #waitForGoogleScript(attempt = 0): void {
    if (window.google?.accounts?.id) {
      this.#initializeButton();
      return;
    }

    if (attempt > 40) return;

    setTimeout(() => this.#waitForGoogleScript(attempt + 1), 250);
  }

  #initializeButton(): void {
    window.google!.accounts.id.initialize({
      client_id: environment.googleClientId,
      callback: (response) => this.credentialReceived.emit(response.credential)
    });

    window.google!.accounts.id.renderButton(this.buttonContainer.nativeElement, {
      theme: 'outline',
      size: 'large',
      width: 320,
      text: 'continue_with'
    });
  }
}
