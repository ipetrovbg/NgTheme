import { Action, combineReducers } from 'redux';
import { CounterActions } from './actions';
import { composeReducers, defaultFormReducer } from '@angular-redux/form';
import { routerReducer } from '@angular-redux/router';
import { loginReducer } from './login.reducer';


export interface ExtendedAction extends Action {
    type: any;
    payload: any;
}


export const rootReducer = composeReducers(
  defaultFormReducer(),
  combineReducers({
    login: loginReducer,
    router: routerReducer,
  }));
