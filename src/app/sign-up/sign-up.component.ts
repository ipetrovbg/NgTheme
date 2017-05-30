import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CounterActions } from '../store/actions';
import { UserService } from '../user/user.service';
import { User } from '../user/user';
import { Router } from '@angular/router';
import { AutoUnsubscribe } from 'app/decorators/autounsubscribe.decorator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
@AutoUnsubscribe()
export class SignUpComponent implements OnInit {
  /**
   * Sign-Up form
   */
  public signUpForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private actions: CounterActions,
    public userService: UserService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.signUpForm = this.fb.group({
      email: [ '', [ Validators.required, Validators.email ] ],
      password: [ '', Validators.required ],
      rePassword: [ '', Validators.required ]
    });
  }

  onSubmit() {
    if ( this.signUpForm.invalid )
      return false;
    this.userService.createUser(this.signUpForm.get('email').value, this.signUpForm.get('password').value )
      .then(state => {
        if ( state && state.success ) {
          this.router.navigate(['/layout/dashboard']);
        } else if ( state && state.error ) {
          this.router.navigate(['/login']);
          this.actions.errorOnLogin(state.error);
        }
      });
  }

}
