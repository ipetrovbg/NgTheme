import { AppState } from './app.state.interface';
export const INITIAL_STATE: AppState = {
  login: {
    submit: false,
    email: '',
    password: ''
  }
};
