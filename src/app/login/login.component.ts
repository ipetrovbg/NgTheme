import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Rx';
import { CounterActions } from '../store/actions';
import { UserService } from '../user/user.service';
import { User } from '../user/user';
import { Router } from '@angular/router';
import { AutoUnsubscribe } from 'app/decorators/autounsubscribe.decorator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
@AutoUnsubscribe()
export class LoginComponent implements OnInit {

  /**
   * login form
   */
  public loginForm: FormGroup;

  /**
   * @Redux subscriptions for store properties
   */
  @select(['user', 'login', 'submit']) public readonly submitLogin$: Observable<boolean>;
  @select(['user']) public readonly user$: Observable<User>;
  @select(['user', 'login', 'failed']) public readonly loginFailed$: Observable<boolean>;
  @select(['user', 'login', 'failedMessage']) public readonly loginFailedMessage$: Observable<string>;

  constructor(
    private fb: FormBuilder,
    private actions: CounterActions,
    public userService: UserService,
    private router: Router,
  ) {}

  ngOnInit() {
    /**
     * initializing reactive form
     */
    this.initializeLoginForm();

    /**
     * subscribe when login failed
     * and dispatch some actions
     */
    this.loginFailed$.subscribe(this._handleLoginFailed.bind(this));

    /**
     * subscribe when user is logged in
     * and navigate to dashboard route
     */
    this.user$.subscribe(this._handleUser.bind(this));
  }

  /**
   * @Event
   * listen when form is valid submitted
   */
  onValidSubmit() {
    this.actions.submitLogin(true);
    this.userService.login(this.loginForm.value.email, this.loginForm.value.password);
  }

  /**
   * @Event
   * listen when login form is invalid submitted
   * and dispatch some actions
   * @param e
   */
  onSubmitError(e) {
    if ( e.email.errors && e.password.errors && e.password.errors.required && e.email.errors.email && e.email.errors.required ) {
      this.actions.errorOnLogin({message: 'Email and Password are required!'});
    } else if ( e.email.errors && !e.password.errors && e.email.errors.email && e.email.errors.required ) {
      this.actions.errorOnLogin({message: 'Email is required!'});
    } else if ( e.email.errors && !e.password.errors && e.email.errors.email && !e.email.errors.required ) {
      this.actions.errorOnLogin({message: 'Email is not valid!'});
    } else if ( e.password.errors && !e.email.errors && e.password.errors.required ) {
      this.actions.errorOnLogin({message: 'Password is required!'});
    } else {
      this.actions.errorOnLogin({ message: 'Error!' });
    }
    this.actions.submitLogin(false);
  }

  googleLogin() {
    this.actions.submitLogin(true);
    this.userService.googleLogin();
  }

  facebookLoginEvent() {
    this.actions.submitLogin(true);
    this.userService.facebookLogin();
  }
  gitHubLogin() {
    this.actions.submitLogin(true);
    this.userService.gitHubLogin();
  }

  /**
   *
   * @param user
   * @private
   */
  private _handleUser( user: User ) {
    if ( user && user.uid ) {
      this.router.navigate(['/layout/dashboard']);
    }
  }

  /**
   * dispatch actions when login failed
   * @private
   */
  private _handleLoginFailed() {
    this.actions.submitLogin(false);
    this.actions.enterCredentials({email: '', password: ''});
  }

  /**
   * Init Login Form
   */
  private initializeLoginForm(): void {
    this.loginForm = this.fb.group({
      email: [ '', [ Validators.required, Validators.email ] ],
      password: [ '', Validators.required ]
    });

    /**
     * dispatch action for
     * populating the store
     * when login form is changed
     */
    this.loginForm
      .valueChanges
      .debounceTime(500)
      .subscribe(form => this.actions.enterCredentials(form));
  }
}
