import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../../model/user';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {UserService} from '../../../../service/user.service';
import {AuthService} from '../../../../service/auth.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

  updateForm: FormGroup;

  userToUpdate: User;

  id: number;

  constructor(private _fb: FormBuilder,
              private userService: UserService,
              private authService: AuthService,
              private _router: Router,
              private _activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {

    // Since we have asynchronous operations i need to put them all inside the first one to make sure they are executed
    // when the first method is finished
    this._activatedRoute.params.subscribe(value => {
      this.id = value['id'];
      if (this.id != null) {
        this.userService.findById(this.id).subscribe(data => {
          this.userToUpdate = data;
          this.updateForm = this._fb.group({
            username: [this.userToUpdate.username, [Validators.required, Validators.minLength(4)]],
            email: [this.userToUpdate.email, [Validators.required, Validators.email, Validators.minLength(12)]],
            password: [this.userToUpdate.password, [Validators.required, Validators.minLength(4)]],
            passwordConfirm: [this.userToUpdate.password, [Validators.required, Validators.minLength(4)]],
            birthday: [this.userToUpdate.birthday, [Validators.required]]
          });
        });
      }
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.updateForm.controls[controlName].hasError(errorName);
  };

  onSubmit() {

    if (this.updateForm.valid) {
      this.setUser();
      this.userService.update(this.userToUpdate)
        .pipe(first())
        .subscribe(data => {
          console.log('Update, let\'s redirect to homepage');
          this._router.navigate(['/login']);
        });
    }

  }

  private setUser(): void {

    this.userToUpdate = {
      id: this.userToUpdate.id,
      username: this.updateForm.get('username').value,
      email: this.updateForm.get('email').value,
      password: this.updateForm.get('password').value,
      passwordConfirm: this.updateForm.get('passwordConfirm').value,
      birthday: this.updateForm.get('birthday').value
    };
  }



}
