import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from '../user/user';

@Component({
  selector: 'app-user-summary',
  templateUrl: './user-summary.component.html',
  styleUrls: ['./user-summary.component.css']
})
export class UserSummaryComponent implements OnInit {
  @Input('user') public user: User;
  @Input('size') public readonly size: number = 40; // tslint:disable-line
  constructor() { }
  ngOnInit() {}

}
