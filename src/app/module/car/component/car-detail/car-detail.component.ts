import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CarService} from '../../../../service/car.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {AuthService} from '../../../../service/auth.service';
import {Car} from '../../../../model/car';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  id: number;
  carToUpdate: Car;
  isLoggedIn: boolean;
  username: string;
  carForm: FormGroup;

  constructor(private _activatedRoute: ActivatedRoute,
              private _carService: CarService,
              private _fb: FormBuilder,
              private _authService: AuthService,
              private _router: Router) {
  }

  ngOnInit() {
    this.setUsername();
    this.setIsLoggedIn()
    this.setCarToUpdate();
  }

  private initCarForm() {
    this.carForm = this._fb.group({
      brand: [this.carToUpdate.brand, [Validators.required, Validators.minLength(4)]],
      model: [this.carToUpdate.model, [Validators.required, Validators.minLength(4)]],
      sold: [this.carToUpdate.sold],
      creation: [this.carToUpdate.creation, [Validators.required]]
    });
  }

  setCarToUpdate() {
    this._activatedRoute.params.subscribe(value => this.id = value['id']);
    if (this.id !== null) {
      this._carService.findCarById(this.id).subscribe(data => {
        this.carToUpdate = data;
        this.initCarForm();
      });
    }
  }

  private setUsername() {
    this._authService.username.subscribe(value => this.username = value);
  }

  private setIsLoggedIn() {
    this._authService.isUserLoggedIn.subscribe(value => this.isLoggedIn = value);
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.carForm.controls[controlName].hasError(errorName);
  };

  onSubmit() {
    this.save();
  }

  private setCar(): void {

    this.carToUpdate = {
      id: this.carToUpdate.id,
      brand: this.carForm.get('brand').value,
      model: this.carForm.get('model').value,
      sold: this.carForm.get('sold').value,
      creation: this.carForm.get('creation').value
    };
  }

  save() {

    if (this.username !== undefined && this.carForm.valid) {
      this.setCar();
      this._carService.update(this.carToUpdate)
        .pipe(first())
        .subscribe(data => {
          console.log('Update, let\'s go to the carToUpdate-list');
          this._router.navigate(['/cars']);
        });
    }
  }

  redirectToCarList() {
    this._router.navigate(['/cars']);
  }
}
