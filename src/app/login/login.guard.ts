import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { LaravelUserServiceService } from '../user/laravel/laravel-user-service.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(
    private laravelService: LaravelUserServiceService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    const subject = new Subject();
    let token = JSON.parse(localStorage.getItem('passport'));
    token = token ? token : {access_token: ''};

    this.laravelService.getUsers(token.access_token)
      .subscribe(user => {
          console.log('here');
      if ( user ) {
        this.router.navigate(['/layout/dashboard']);
        subject.next(false);
        return false;
      }
        subject.next(true);
          this.router.navigate(['/login']);
    },
      err => {
        console.log('here');
        subject.next(true);
        return;
      });
    return subject;
  }
}
