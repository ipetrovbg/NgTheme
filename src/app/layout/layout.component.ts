import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from '../user/user.service';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { User } from '../user/user';

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
  ) { }

  ngOnInit() {}

  isOver(): boolean {
    return window.matchMedia(`(max-width: 960px)`).matches;
  }

  logout() {
    this.userService.logout();
  }

}
