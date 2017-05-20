import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent implements OnInit {
  @Input('form') public form: FormGroup;
  @Input('is-submited') public isSubmited: boolean;
  @Output('onValidSubmit') public onValidSubmit = new EventEmitter();
  @Output('errorSubmit') public errorSubmit = new EventEmitter();
  constructor() { }

  ngOnInit() {}

  onSubmit() {
    if ( this.form.valid ) {
      this.onValidSubmit.emit(this.form.controls);
    } else {
      this.errorSubmit.emit(this.form.controls);
    }
  }

}
