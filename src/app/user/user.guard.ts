import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { CounterActions } from '../store/actions';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private af: AngularFireAuth,
    private actions: CounterActions,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> | boolean {
    return this.af.authState.map(user => {
      if ( user ) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    }).take(1);
  }
}
