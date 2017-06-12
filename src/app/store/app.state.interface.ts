import * as Immutable from 'immutable';
import { INITIAL_STATE } from 'app/store/initial.state';

export interface ILoginStore {
  submit: boolean;
  email: string;
  password: string;
  failed: boolean;
  failedMessage: string;
}
export interface IUserStore {
  id: string;
  name?: string;
  email: string;
  login: ILoginStore;
}
export interface INavigationItem {
  name: string;
  state: boolean;
}
export interface INavigationStore {
  data: Array<INavigationItem>;
  fullScreen: boolean;
}
export interface AppState {
  user: IUserStore;
  navigation: INavigationStore;
}
