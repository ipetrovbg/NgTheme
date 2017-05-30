import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { AutoUnsubscribe } from 'app/decorators/autounsubscribe.decorator';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
const query = gql`
  query {
    users {
      name
      email
      news {
        title
      }
    }
  }
`;
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
  ) {}

  ngOnInit() {
    this.apollo.watchQuery({
      query
    }).subscribe(data => {
      console.log(data);
    });
  }

  toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }
  launchIntoFullscreen(element) {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  }

  fullScreen() {
    this.launchIntoFullscreen(document.documentElement);
  }

}
