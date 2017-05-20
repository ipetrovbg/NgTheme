import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select } from '@angular-redux/store/lib/src';
import { Observable } from 'rxjs/Rx';
import { CounterActions } from '../store/actions';
import { Login } from '../store/app.state.interface';
import { UserService } from '../user/user.service';
import { User } from '../user/user';
import { Router } from '@angular/router';
import { AutoUnsubscribe } from 'app/decorators/autounsubscribe.decorator';

/*
* @AutoUnsubscribe(["one$", "two$"])
* */

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
@AutoUnsubscribe()
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  @select(['login', 'submit']) public readonly submitLogin$: Observable<boolean>;
  @select(['login']) public readonly login$: Observable<Login>;
  @select(['user']) public readonly user$: Observable<User>;
  public user: User;
  constructor(
    private fb: FormBuilder,
    private actions: CounterActions,
    public userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initializeLoginForm();
    this.user$.subscribe(user => {
      console.log(user);
      this.user = user;
      if ( user && user.uid ) {
        this.router.navigate(['/layout/dashboard']);
      }
    });

    this.submitLogin$.subscribe(state => {
      if ( state ) {
        setTimeout(() => {
          this.actions.submitLogin(false);
          this.actions.enterCredentials({email: '', password: ''});
        }, 2000);
      }
    });
  }

  onValidSubmit() {
    this.actions.submitLogin(true);
    if ( this.user && !this.user.uid ) {
      this.userService.login(this.loginForm.value.email, this.loginForm.value.password);
    } else {
      console.log('already has user!', this.user);
    }
  }

  /**
   * Init Login Form
   */
  private initializeLoginForm(): void {
    this.loginForm = this.fb.group({
      email: [ '', [ Validators.required, Validators.email ] ],
      password: [ '', Validators.required ]
    });
    /* populating the store */
    this.loginForm.valueChanges.debounceTime(500).subscribe(form => this.actions.enterCredentials(form));
  }
}
