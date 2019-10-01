import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../../model/user';
import {AuthService} from '../../../../service/auth.service';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {CarDTO} from '../../../../model/car-dto';
import {CarService} from '../../../../service/car.service';
import {Car} from '../../../../model/car';

@Component({
  selector: 'app-car-create',
  templateUrl: './car-create.component.html',
  styleUrls: ['./car-create.component.css']
})
export class CarCreateComponent implements OnInit {

  carForm: FormGroup;

  isLoggedIn: boolean;

  username: string;

  // car: CarDTO = {id: 0, brand: '', model: '', sold: false, creation: null, user: null};

  car: Car = {id: 0, brand: '', model: '', sold: false, creation: null};

  constructor(private _fb: FormBuilder,
              private _authService: AuthService,
              private _carService: CarService,
              private _router: Router) {
  }

  ngOnInit() {

    this._authService.username.subscribe(value => this.username = value);
    this._authService.isUserLoggedIn.subscribe(value => this.isLoggedIn = value);

    this.carForm = this._fb.group({
      brand: ['', [Validators.required, Validators.minLength(4)]],
      model: ['', [Validators.required, Validators.minLength(4)]],
      sold: [''],
      creation: ['', [Validators.required]]
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.carForm.controls[controlName].hasError(errorName);
  }

  onSubmit() {
    this.save();
  }

  private setCar(): void {

    this.car = {
      id: 0,
      brand: this.carForm.get('brand').value,
      model: this.carForm.get('model').value,
      sold: this.carForm.get('sold').value,
      creation: this.carForm.get('creation').value,
      // user: {id: 0, username: this.username, email: '', password: '', passwordConfirm: '', birthday: null}
    };
  }

  save() {

    if (this.username !== undefined && this.carForm.valid) {
      this.setCar();
      this._carService.save(this.car)
        .pipe(first())
        .subscribe(data => {
          console.log('Registered, let\'s go to the carToUpdate-list');
          this._router.navigate(['/cars']);
        });
    }
  }

}
