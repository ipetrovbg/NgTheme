import { AppState } from './app.state.interface';

export const INITIAL_STATE: AppState = {
  user: {
    uid: '',
    displayName: '',
    photoURL: '',
    email: '',
    login: {
      submit: false,
      email: '',
      password: '',
      failed: false,
      failedMessage: ''
    }
  }
};
