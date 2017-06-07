import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { AutoUnsubscribe } from 'app/decorators/autounsubscribe.decorator';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { LaravelUserServiceService } from '../laravel-user-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
@AutoUnsubscribe()
export class DashboardComponent implements OnInit {
  public tileOptions = {
    // ripple: true,
    header: {
      text: 'Select Date',
      padding: {
        top: '10px',
        left: '10px',
        right: '10px',
        bottom: '10px'
      },
      border: {
        // color: '#c9c9c9'
      },
      style: {
        'font-size': '18px'
      },
      icon: 'date_range'
    },
    style: {
      // padding: '10px',
    //   margin: '20px',
    //   width: '300px',
    //   background: '#d5b6d6',
    //   color: 'white'
    }
  };

  constructor(
    private userService: UserService,
    private apollo: Apollo,
    private laravelUser: LaravelUserServiceService
  ) {}

  ngOnInit() {
    let token = JSON.parse(localStorage.getItem('passport'));
    token = token ? token : {access_token: ''};
    this.getUsers(token);
    // this.laravelUser.getAccessToken()
    //   .subscribe(data => {
    //     localStorage.setItem('passport', JSON.stringify(data));
    //
    //   });
  }

  getUsers(accessToken: any) {
    this.laravelUser.getUsers(accessToken.access_token)
      .subscribe(users => {
        console.log(users.id);
        const query = gql`
          query {
            users(id: ${users.id}) {
              name
              id
            }
          }
        `;
        this.apollo.watchQuery({
          query,
          variables: {
            id: users.id
          } }).subscribe(data => {
          console.log(data);
        });
        });
  }

}
