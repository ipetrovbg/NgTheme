import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppState } from './store';

@Injectable()
export class CounterActions {
    static SUBMIT_LOGIN = 'SUBMIT_LOGIN';

    constructor(private ngRedux: NgRedux<AppState>) {}

    submitLogin(state) {
        this.ngRedux.dispatch({ type: CounterActions.SUBMIT_LOGIN, payload: state });
    }
}
