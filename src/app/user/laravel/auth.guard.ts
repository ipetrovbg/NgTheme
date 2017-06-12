import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CanActivate, Router } from '@angular/router';
import { LaravelUserServiceService } from 'app/user/laravel/laravel-user-service.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LaravelAuthGuard implements CanActivate {

  constructor(
    private laravelUser: LaravelUserServiceService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> | boolean {
    const subject = new Subject();
    let token = JSON.parse(localStorage.getItem('passport'));
    token = token ? token : {access_token: ''};

    this.laravelUser.getUsers(token.access_token)
      .subscribe(user => {
          if ( user ) {
            subject.next(true);
            return false;
          }
          this.router.navigate(['/login']);
          subject.next(false);
        },
        err => {
          this.router.navigate(['/login']);
          subject.next(false);
        });
    return subject;
  }
}
