import { Component, OnInit } from '@angular/core';
import { PcloudService } from '../core/pcloud.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public pieChartLabels: string[] = ['Quota', 'Used'];
  public pieChartData: number[] = [0, 0];
  public pieOptions: any = {
    responsive: true,
  };
  // public pieDataSet: any = [
  //   {
  //     backgroundColor: 'rgba(215, 40, 40, 0.9)'
  //   },
  //   {
  //     backgroundColor: '#ca0019'
  //   },
  // ];
  public pieChartColors: any = [
    {
      backgroundColor: ['rgba(12, 82, 166, 1)', 'rgba(241, 4, 4, 1)']
    },
  ];
  public pieChartType: string = 'pie'; // tslint:disable-line
  public tileOptions: any = {
    header: {
      text: 'PCLOUD',
      style: {
        'font-size': '18px'
      },
      icon: 'pie_chart'
    },
    style: {
       width: '300px',
      height: '350px'
    }
  };
  public pCloudUser: any;
  constructor(
    private pCloud: PcloudService,
  ) { }

  ngOnInit() {
    this.pCloud
      .getUserByAuth('4hvkJZXW3LZpLW8d4X1nOLnPEdteB2sykICbqpV')
      .subscribe(pUser => {
        this.pCloudUser = pUser;
      this.pieChartData = [( Math.round(pUser.quota / 1048576) / 1000 ), ( Math.round(pUser.usedquota / 1048576) / 1000 )];
    },
    err => console.log(err));
  }

  chartHovered(e) {
    console.log(e);
  }
  chartClicked(e) {
    console.log(e);
  }

}
