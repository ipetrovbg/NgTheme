import { Action, combineReducers } from 'redux';
import { composeReducers, defaultFormReducer } from '@angular-redux/form';
import { routerReducer } from '@angular-redux/router';
import { userReducer } from './user.reducer';


export interface ExtendedAction extends Action {
    type: any;
    payload: any;
}


export const rootReducer = composeReducers(
  defaultFormReducer(),
  combineReducers({
    user: userReducer,
    router: routerReducer,
  }));
