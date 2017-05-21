import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { User } from './user';
import { CounterActions } from '../store/actions';

@Injectable()
export class UserService {
  public user: BehaviorSubject<User>;

  constructor(
    private actions: CounterActions,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    if (!this.user) {
      this.user = <BehaviorSubject<User>> new BehaviorSubject(new User({}));
    }

    this.afAuth
      .authState
      .subscribe( user => {
      user ? this.actions.updateUser(new User(user)) :  this.actions.updateUser(new User({}));
    });
   }

  login(email, password) {
    firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        this.actions.loginReset();
        this.actions.updateUser(new User(user));
      })
      .catch(err => this.actions.errorOnLogin(err));
  }

  logout() {
    this.afAuth.auth.signOut();
    this.actions.updateUser(new User({}));
    this.router.navigate(['/login']);
  }

  getUser(): Observable<User> {
    return this.user.asObservable();
  }

  isAuth (): Observable<boolean> {
    const subject = new BehaviorSubject(false);
    this.getUser().subscribe(user => {
      user.user ? subject.next(true) : subject.next(false);
    });
    return subject;
  }

}
