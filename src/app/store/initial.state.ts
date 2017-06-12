import { AppState } from './app.state.interface';

export const INITIAL_STATE: AppState = {
  user: {
    id: '',
    name: '',
    email: '',
    login: {
      submit: false,
      email: '',
      password: '',
      failed: false,
      failedMessage: ''
    }
  },
  navigation: {
    data: [
      {
        name: 'home',
        state: false
      },
      {
        name: 'dashboard',
        state: false
      },
      {
        name: 'profile',
        state: false
      }
    ],
    fullScreen: false,
  }
};
