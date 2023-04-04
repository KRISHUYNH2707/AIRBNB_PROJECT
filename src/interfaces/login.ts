export interface LoginDto<C> {
    user: C;
    token: string;
  }
  
  export interface Token {
    token: string;
  }
  
  export interface UserInfo {
    id: number;
    name: string;
    email: string;
    password: string;
    phone: string;
    birthday: string;
    avatar: string;
    gender: boolean;
    role: string;
  }
  