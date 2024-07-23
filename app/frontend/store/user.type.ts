export interface User {
  id: number;
  username: string;
  password: string;
}

export interface UserValidationError {
  type: string;
  field: string;
  message: string;
}

export interface ValidationErrorResponse {
  errors: UserValidationError[];
}

export interface LoginStatus {
  logged_in: boolean;
}

export interface UserResponse {
  user: User;
  logged_in: boolean;
}
