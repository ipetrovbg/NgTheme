import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select } from '@angular-redux/store/lib/src';
import { Observable } from 'rxjs/Rx';
import { CounterActions } from '../store/actions';
import { Login } from '../store/app.state.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  @select(['login', 'submit']) public readonly submitLogin$: Observable<boolean>;
  @select(['login']) public readonly login$: Observable<Login>;

  constructor(
    private fb: FormBuilder,
    private actions: CounterActions
  ) { }

  ngOnInit() {
    this.initializeLoginForm();

    this.submitLogin$.subscribe(state => {
      if ( state ) {
        setTimeout(() => {
          this.actions.submitLogin(false);
          this.actions.enterCredentials({email: '', password: ''});
        }, 2000);
      }
    });
    this.login$.subscribe(login => {
      this.loginForm.patchValue({
        email: login.email,
        password: login.password,
      });
    });
  }

  onValidSubmit(e) {
    this.actions.submitLogin(true);
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
