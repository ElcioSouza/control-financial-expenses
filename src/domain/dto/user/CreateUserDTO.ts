export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  balance?: number;
}
