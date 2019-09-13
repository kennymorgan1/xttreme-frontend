export class RegisterInterface {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export class LoginInterface {
  username: string;
  password: string;
}

export class User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  token: string;
  roles?: string[];
}
