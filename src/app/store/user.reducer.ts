import { ExtendedAction } from './store';
import { CounterActions } from './actions';
import { INITIAL_STATE } from './initial.state';
import { IUserStore } from 'app/store/app.state.interface';


// A higher-order reducer: accepts an animal type and returns a reducer
// that only responds to actions for that particular animal type.
export function userReducer(state: IUserStore = INITIAL_STATE.user, action: ExtendedAction): IUserStore {
  switch (action.type) {
    case CounterActions.UPDATE_USER:
      state.email       = action.payload.email;
      state.uid         = action.payload.uid;
      state.displayName = action.payload.displayName;
      state.photoURL    = action.payload.photoURL;
      return Object.assign({}, state);
    case CounterActions.SUBMIT_LOGIN:
      state.login.submit = action.payload;
      return Object.assign({}, state);
    case CounterActions.ENTER_CREDENTIALS:
      state.login.email = action.payload.email;
      state.login.password = action.payload.password;
      return Object.assign({}, state);
    case CounterActions.ERROR_ON_LOGIN:
      state.login.submit = false;
      state.login.failed = true;
      state.login.failedMessage = action.payload.message;
      return Object.assign({}, state);
    case CounterActions.LOGIN_RESET:
      state.login.failed = false;
      state.login.failedMessage = '';
      state.login.email = '';
      state.login.password = '';
      state.login.email = '';
      return Object.assign({}, state);
    default :
      return state;
  }
}
