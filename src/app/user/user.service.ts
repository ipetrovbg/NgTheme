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
  private provider: string;

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
    this._fetchProvidersForEmail(email, password);
  }

  googleLogin() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(this._handleSuccessLogin.bind(this))
      .catch((err) => this._handleErrorLogin(err, ''));
  }

  facebookLogin() {
    const facebook = new firebase.auth.FacebookAuthProvider();
    this.afAuth.auth.signInWithPopup(facebook)
      .then(this._handleSuccessLogin.bind(this))
      .catch((err) => this._handleErrorLogin(err, ''));
  }

  gitHubLogin() {
    const github = new firebase.auth.GithubAuthProvider();
    this.afAuth.auth.signInWithPopup(github)
      .then(this._handleSuccessLogin.bind(this))
      .catch((err) => this._handleErrorLogin(err, ''));
  }

  createUser(email, password) {
    return this._fetchProvidersForEmail(email, password);
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

  private _handleSuccessLogin(user) {
    this.actions.loginReset();
    this.actions.updateUser(new User(user.user));
  }

  private _handleErrorLogin(err, item) {
    switch (err.code) {
      case 'auth/account-exists-with-different-credential':
        this._fetchProvidersForEmail(err.email, '');
        break;
      case 'auth/email-already-in-use':
        this._fetchProvidersForEmail(err.email, '');
        break;
      case 'auth/user-not-found':
        this.afAuth.auth.createUserWithEmailAndPassword(item.email, item.password)
          .then(this._handleSuccessLogin.bind(this))
          .catch(error => this._handleErrorLogin(error, ''));
        break;
      default: this.actions.errorOnLogin(err);
    }
  }

  private _fetchProvidersForEmail(email, password) {
    return this.afAuth.auth.fetchProvidersForEmail(email).then(provider => {
      console.log(provider);
      if ( provider.length && provider[0] === 'google.com' ) {
        this.googleLogin();
      } if ( provider.length && provider[0] === 'facebook.com' ) {
        this.facebookLogin();
      } if ( provider.length && provider[0] === 'github.com' ) {
        this.gitHubLogin();
      } else if (provider.length && provider[0] === 'password' ) {
        this._signUpWithEmailAndPassword(email, password);
      } else {
        this._signUpWithEmailAndPassword(email, password);
      }
    }).catch((err) => this._handleErrorLogin(err, ''));
  }

  private _signUpWithEmailAndPassword(email, password) {
    firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        this.actions.loginReset();
        this.actions.updateUser(new User(user));
        // let hasGoogleProvider = false;
        // let hasGitHubProvider = false;
        // let hasFacebookProvider = false;
        // user.providerData.forEach(provider => {
        //   hasGoogleProvider = provider.providerId === 'google.com' ? true : false;
        // hasGitHubProvider = provider.providerId === 'github.com' ? true : false;
        // hasFacebookProvider = provider.providerId === 'facebook.com' ? true : false;
        // });
        // if ( !hasGoogleProvider ) {
        //   const googleProvider = new firebase.auth.GoogleAuthProvider();
        //   this.actions.updateUser(new User({}));
        //   firebase.auth().currentUser.linkWithPopup(googleProvider)
        //     .then(linkedUser => {
        //       this.actions.updateUser(new User(linkedUser.user));
        //     });
        // }
        // if ( !hasGitHubProvider ) {
        //   const gitHubProvider = new firebase.auth.GithubAuthProvider();
        //   firebase.auth().currentUser.linkWithPopup(gitHubProvider)
        //     .then(linkedUser => {
        //       console.log(linkedUser);
        //     });
        // }
        // if ( !hasFacebookProvider ) {
        //   const facebookProvider = new firebase.auth.FacebookAuthProvider();
        //   firebase.auth().currentUser.linkWithPopup(facebookProvider)
        //     .then(linkedUser => {
        //       console.log(linkedUser);
        //     });
        // }
      })
      .catch((err: any) => {
        this._handleErrorLogin(err, {email, password});
      });
  }

}
