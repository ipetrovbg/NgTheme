import { ExtendedAction } from './store';
import { CounterActions } from './actions';
import { INITIAL_STATE } from './initial.state';
import { NavigationStore } from './navigation.model';

export function navigationResucer(state: NavigationStore = INITIAL_STATE.navigation, action: ExtendedAction): NavigationStore {
  switch ( action.type ) {
    case CounterActions.UPDATE_NAVIGATION: {
      state.data.map((item, i) => {
        if ( state.data[i].name === action.payload ) {
          state.data[i].state = !state.data[i].state;
        } else {
          state.data[i].state = false;
        }
      });
      return Object.assign({}, state);
    }
    case CounterActions.FULL_SCREEN: {
      state.fullScreen = !state.fullScreen;
      return Object.assign({}, state);
    }
    default : return state;
  }
}
