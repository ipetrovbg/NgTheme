import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs/Rx';

import { User } from '../user';
import { CounterActions } from '../../store/actions';

@Injectable()
export class LaravelUserServiceService {
  private oauthUrl = 'http://localhost:8000/oauth/token';
  private usersUrl = 'http://localhost:8000/api/user';
  private apiUrl = 'http://localhost:8000/api';
  public user: BehaviorSubject<User>;
  constructor(
    private http: Http,
    private actions: CounterActions,
    private router: Router,
  ) {
    if (!this.user) {
      this.user = <BehaviorSubject<User>> new BehaviorSubject(new User({}));
    }
    let token = JSON.parse(localStorage.getItem('passport'));
    token = token ? token : {access_token: ''};
    this.getUsers(token.access_token)
      .subscribe(user => {
        user ? this.actions.updateUser(new User(user)) :  this.actions.updateUser(new User({}));
      });
  }

  isAuth (): Observable<boolean> {
    const subject = new BehaviorSubject(false);
    this.getUser().subscribe(user => {
      user.user ? subject.next(true) : subject.next(false);
    });
    return subject;
  }

  getUser(): Observable<User> {
    return this.user.asObservable();
  }

  getAccessToken(email, password) {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    const postData = {
      grant_type: 'password',
      client_id: 2,
      client_secret: 'dIp2X5LGkrCF86RN8mrDXIXXRL2a0Hd1iZamgBSu',
      username: email,
      password: password,
      scope: '*'
    }

    return this.http.post(this.oauthUrl, JSON.stringify(postData), {
      headers: headers
    })
      .map((res: Response) => {
        localStorage.setItem('passport', JSON.stringify(res.json()));
        return res.json();
      })
      .catch((error: any) => {
        this.actions.errorOnLogin({message: error});
      return Observable.throw(error.json().error || 'Server error');
      });
  }

  getUsers(accessToken: string): Observable<any> {

    const headers = new Headers({
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + accessToken,
    });

    return this.http.get(this.usersUrl, {headers})
      .map((res: Response) => res.json())
      .catch((error: any) => {
        this.actions.errorOnLogin({message: error});
        return Observable.throw(error.json().error || 'Server error');
      });
  }

  logout(accessToken: string) {
    const headers = new Headers({
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + accessToken,
    });
    return this.http.get(`${this.apiUrl}/logout`, { headers })
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  private _handleSuccessLogin(user) {
    this.actions.loginReset();
    this.actions.updateUser(new User(user.user));
  }

  // private _handleErrorLogin(err, item) {
  //   switch (err.code) {
  //     case 'auth/account-exists-with-different-credential':
  //       this._fetchProvidersForEmail(err.email, '');
  //       break;
  //     case 'auth/email-already-in-use':
  //       this._fetchProvidersForEmail(err.email, '');
  //       break;
  //     case 'auth/user-not-found':
  //       this.afAuth.auth.createUserWithEmailAndPassword(item.email, item.password)
  //         .then(this._handleSuccessLogin.bind(this))
  //         .catch(error => this._handleErrorLogin(error, ''));
  //       break;
  //     default: this.actions.errorOnLogin(err);
  //   }
  // }

}
