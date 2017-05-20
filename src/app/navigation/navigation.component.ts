import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store/lib/src';
import { Observable } from 'rxjs/Rx';
import { UserService } from '../user/user.service';
import { User } from '../user/user';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  @select(['user']) public readonly user$: Observable<User>;
  constructor(
    public userService: UserService,
  ) { }

  ngOnInit() {
  }

  logout() {
    this.userService.logout();
  }
}
