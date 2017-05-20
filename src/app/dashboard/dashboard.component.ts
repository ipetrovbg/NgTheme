import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { AutoUnsubscribe } from 'app/decorators/autounsubscribe.decorator';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
@AutoUnsubscribe()
export class DashboardComponent implements OnInit {

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {}

}
