import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Credential} from '../../../../model/credential';
import {AuthService} from '../../../../service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  credential: Credential = {username: '', password: ''};

  constructor(private _fb: FormBuilder,
              private _authService: AuthService,
              private _router: Router) {
  }

  ngOnInit() {
    this.loginForm = this._fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  };

  onSubmit(): void {

    this.setUserCredential();
    this._authService.login(this.credential).subscribe(
      (data: boolean) => {
        this._router.navigate(['/users']);
      }
    );
  }

  cancel(): void {
    this._router.navigate(['/login']);
  }

  private setUserCredential() {

    this.credential = {username: this.loginForm.controls['username'].value, password: this.loginForm.controls['password'].value};

  }

}
