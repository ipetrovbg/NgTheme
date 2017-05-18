import { Action } from 'redux';
import { CounterActions } from './actions';

export interface ExtendedAction extends Action {
    type: any;
    payload: any;
}
export interface AppState {
  submitLogin: boolean;
}

export const INITIAL_STATE: AppState = {
  submitLogin: false
};

export function rootReducer(state: AppState, action: ExtendedAction): AppState {
    switch (action.type) {
        case CounterActions.SUBMIT_LOGIN: {
            state.submitLogin = action.payload;
            return Object.assign({}, state );
        }
        default: return state;
    }
}
