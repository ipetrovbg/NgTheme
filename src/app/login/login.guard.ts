import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CanActivate } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(
    private af: AngularFireAuth,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> | boolean {
    return this.af.authState.map(user => {
      if ( user ) {
        this.router.navigate(['/layout/dashboard']);
        return false;
      } else {
        return true;
      }
    }).take(1);
  }
}
