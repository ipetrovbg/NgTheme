import { ExtendedAction } from './store';
import { CounterActions } from './actions';
import { AppState } from './app.state.interface';
import { INITIAL_STATE } from './initial.state';



// A higher-order reducer: accepts an animal type and returns a reducer
// that only responds to actions for that particular animal type.
export function loginReducer(state: AppState = INITIAL_STATE, action: ExtendedAction): AppState {
  switch (action.type) {
    case CounterActions.SUBMIT_LOGIN:
      return {...state, submit: action.payload};
    case CounterActions.ENTER_CREDENTIALS:
      return {...state, email: action.payload.email, password: action.payload.password };
    default :
      return state;
  }
}
