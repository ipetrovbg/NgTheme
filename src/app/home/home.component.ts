import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public tileOptions = {
    header: {
      text: 'Title custom',
      padding: {
        top: '120px',
        left: '10px',
        right: '10px',
        bottom: '10px'
      },
      style: {
        'font-size': '18px'
      },
      icon: 'backup'
    },
    style: {
      margin: '20px',
      width: '40%'
    }
  };

  constructor() {
  }

  ngOnInit() {
  }

}
