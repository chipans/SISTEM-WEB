export interface LoginRequestInterface {
  email: string;
  password: string;
}

export type UserRoleType = 'Administrador' | 'Ayudante';

export interface AuthResponseInterface {
  accessToken: string;
  email: string;
  name: string;
  role: UserRoleType;
}