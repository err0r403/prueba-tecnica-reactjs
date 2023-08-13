export class Auth {
  constructor(public email: string, public password: string) {}
}

export interface UserToken {
  id?: string;
  token: string;
}
