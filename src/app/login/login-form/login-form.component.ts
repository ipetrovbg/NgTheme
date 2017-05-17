import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  @Input('form') public form: FormGroup;

  constructor() { }

  ngOnInit() {
    // this.form.valueChanges.subscribe(form => {
    //   if ( this.form.valid ) {
    //     console.log(this.form);
    //   }
    // });
  }

}
