export interface RegisterDto<C> {
  user: C;
  token: string;
}

export interface TokenRegister {
  token : string
}
export interface UserInfoRegister {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  birthday: string;
  gender: true;
  address?: string;
  role?: string;
}
