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
  public tileOptions = {
    header: {
      text: 'Title',
      padding: {
        top: '10px',
        left: '10px',
        right: '10px',
        bottom: '10px'
      },
      border: {
        color: '#ccc'
      },
      style: {
        'font-size': '18px'
      },
      icon: 'home'
    },
    style: {
      margin: '20px',
    }
  };
  constructor(
    private userService: UserService,
  ) {}

  ngOnInit() {}

}
