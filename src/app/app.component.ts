import { Component, ViewEncapsulation } from '@angular/core';
import { NgRedux, DevToolsExtension } from '@angular-redux/store';
import { AppState, INITIAL_STATE, rootReducer } from './store/store';
import { CounterActions } from './store/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  constructor(
    ngRedux: NgRedux<AppState>,
    devTools: DevToolsExtension,
    private action: CounterActions,
  ) {
    ngRedux.configureStore(
      rootReducer,
      INITIAL_STATE,
      null,
      devTools.isEnabled() ? [ devTools.enhancer() ] : []
    );
  }
}
