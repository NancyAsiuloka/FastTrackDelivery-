
export interface RegisterUser {
  full_name: string,
  email: string;
  password: string;
  phone_number: number;
}

export interface LoginUser {
  email: string;
  password: string;
}
