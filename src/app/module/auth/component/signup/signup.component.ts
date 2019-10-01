import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../../model/user';
import {AuthService} from '../../../../service/auth.service';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;

  user: User = {id: 0, username: '', email: '', password: '', passwordConfirm: '', birthday: null};

  constructor(private _fb: FormBuilder,
              private authService: AuthService,
              private _router: Router) {
  }

  ngOnInit() {
    this.signUpForm = this._fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email, Validators.minLength(12)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(4)]],
      birthday: ['', [Validators.required]]
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.signUpForm.controls[controlName].hasError(errorName);
  }

  onSubmit() {

    if (this.signUpForm.valid) {

      this.setUser();
      this.authService.save(this.user)
        .pipe(first())
        .subscribe(data => {
          console.log('Registered, let\'s go to home directory');
          this._router.navigate(['/login']);
        });
    }

  }

  private setUser(): void {

    this.user = {
      id: 0,
      username: this.signUpForm.get('username').value,
      email: this.signUpForm.get('email').value,
      password: this.signUpForm.get('password').value,
      passwordConfirm: this.signUpForm.get('passwordConfirm').value,
      birthday: this.signUpForm.get('birthday').value
    };
  }

}
