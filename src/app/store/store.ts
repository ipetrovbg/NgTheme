import { Action, combineReducers } from 'redux';
import { composeReducers, defaultFormReducer } from '@angular-redux/form';
import { routerReducer } from '@angular-redux/router';
import { userReducer } from './user.reducer';
import { navigationResucer } from './navigation.reducer';

import { ApolloClient, createNetworkInterface } from 'apollo-client';


export interface ExtendedAction extends Action {
    type: any;
    payload: any;
}
export const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'http://localhost:8000/graphql'
  }),
});

export const rootReducer = composeReducers(
  defaultFormReducer(),
  combineReducers({
    user: userReducer,
    navigation: navigationResucer,
    router: routerReducer,
    apollo: client.reducer() as any,
  }));
