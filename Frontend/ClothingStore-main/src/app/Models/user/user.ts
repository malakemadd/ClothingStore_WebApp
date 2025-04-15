export interface User {
  Email: string;
  Password: string;
  rememberMe: boolean;
}
export interface registerDTO {
  firstName: string
  lastName: string
  userName: string
  dateOfBirth: Date
  email: string
  phoneNumber: string
  password: string
  confirmPassword: string
  rememberme: boolean
}
export interface logDTO {
  usernameOrEmail: string
  password: string
  rememberme: boolean
}
export interface isAuthenticated {
  isAuthenticated: boolean
  userName?: string
}
