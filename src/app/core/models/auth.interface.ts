export interface LoginRequestInterface {
  email: string;
  password: string;
}

export interface RegisterRequestInterface {
  email: string;
  password: string;
  fullName: string;
}

export interface GoogleLoginRequestInterface {
  idToken: string;
}

export interface AuthResponseInterface {
  token: string;
  email: string;
  fullName: string;
}
