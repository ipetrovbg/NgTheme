export interface Login {
  submit: boolean;
  email: string;
  password: string;
}
export interface AppState {
  login: Login;
}
