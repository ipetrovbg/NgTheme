import { ExtendedAction } from './store';
import { CounterActions } from './actions';
import { AppState } from './app.state.interface';
import { INITIAL_STATE } from './initial.state';



// A higher-order reducer: accepts an animal type and returns a reducer
// that only responds to actions for that particular animal type.
export function userReducer(state: AppState = INITIAL_STATE, action: ExtendedAction): AppState {
  switch (action.type) {
    case CounterActions.UPDATE_USER:
      return {
        ...state,
        email: action.payload.email,
        uid: action.payload.uid,
        displayName: action.payload.displayName,
        photoURL: action.payload.photoURL
      };
    case CounterActions.ERROR_ON_UPDATE_USER:
      console.log('ERROR_ON_UPDATE_USER-> ', action.payload);
      return state;
    default :
      return state;
  }
}
