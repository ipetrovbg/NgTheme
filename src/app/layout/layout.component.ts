import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from '../user/user.service';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { User } from '../user/user';
import { CounterActions } from '../store/actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LayoutComponent implements OnInit {
  @select(['user']) public readonly user$: Observable<User>;
  constructor(
    public userService: UserService,
    private actions: CounterActions,
    private router: Router,
  ) { }

  ngOnInit() {}

  isOver(): boolean {
    return window.matchMedia(`(max-width: 960px)`).matches;
  }
  toggle() {

    setTimeout(() => {
      this.router.navigate(['/layout/profile']);
      if ( !this.router.isActive('/layout/profile', true) ) {
        this.actions.updateNavigation('profile');
      }
    }, 200);
  }
  logout() {
    this.userService.logout();
  }

}
