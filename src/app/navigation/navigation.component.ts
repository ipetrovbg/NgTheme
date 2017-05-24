import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import { CounterActions } from '../store/actions';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  @select(['navigation']) public readonly navigation$;
  constructor(
    private actions: CounterActions
  ) { }

  ngOnInit() {}

  toggle(item) {
    setTimeout(() => {
      this.actions.updateNavigation(item);
    }, 200);
  }
}
