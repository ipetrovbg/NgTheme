import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select } from '@angular-redux/store/lib/src';
import { Observable } from 'rxjs/Rx';
import { CounterActions } from '../store/actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  @select() public readonly submitLogin$: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private actions: CounterActions
  ) { }

  ngOnInit() {
    this.initializeLoginForm();
    this.submitLogin$.subscribe(state => {
      if ( state ) {
        console.log(state);
        setTimeout(() => {
          this.actions.submitLogin(false);
        }, 2000);
      }
    });
  }

  onValidSubmit(e) {
    // console.log(e);
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
  }
}
