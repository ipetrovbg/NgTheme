import { ExtendedAction } from './store';
import { CounterActions } from './actions';
import { AppState } from './app.state.interface';
import { INITIAL_STATE } from './initial.state';



// A higher-order reducer: accepts an animal type and returns a reducer
// that only responds to actions for that particular animal type.
export function userLoginReducer(state: AppState = INITIAL_STATE, action: ExtendedAction): AppState {
  switch (action.type) {
    default :
      return state;
  }
}
