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

const networkInterface = createNetworkInterface({
    uri: 'http://localhost:8000/graphql'
  });
//
networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};  // Create the header object if needed.
    }
    // get the authentication token from local storage if it exists
    const token = JSON.parse(localStorage.getItem('passport'));
    req.options.headers.Authorization =  `${token.token_type} ${token.access_token}`;
    next();
  }
}]);
export const client = new ApolloClient({networkInterface});



export const rootReducer = composeReducers(
  defaultFormReducer(),
  combineReducers({
    user: userReducer,
    navigation: navigationResucer,
    router: routerReducer,
    apollo: client.reducer() as any,
  }));
