import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CarDTO} from '../model/car-dto';
import {Constant} from '../util/constant';
import {Observable} from 'rxjs';
import {Car} from '../model/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private _http: HttpClient) {
  }

  public save(car: Car) {

    return this._http.post(Constant.CAR_URL, car);
  }

  public findAll(): Observable<Car[]> {

    return this._http.get<Car[]>(Constant.CAR_URL);
  }

  /*public countNumberOfCars(): Observable<number> {
    return this._http.get(Constant.CAR_URL + '/count');
  }*/

  public countNumberOfCars(username: string): Observable<number[]> {
    return this._http.get<number[]>(Constant.CAR_URL + '/countsize/' + username);
  }

  findUnSoldCars(page: number, size: number): Observable<Car[]> {
    return this._http.get<Car[]>(Constant.CAR_URL + '/unsold' + '?page=' + page + '&size=' + size);
  }

  findSoldCars(page: number, size: number): Observable<Car[]> {
    return this._http.get<Car[]>(Constant.CAR_URL + '/sold' + '?page=' + page + '&size=' + size);
  }

  findCarById(id: number): Observable<Car> {
    return this._http.get<Car>(Constant.CAR_URL + '/' + id);
  }

  update(carToUpdate: Car): Observable<Car> {
    return this._http.put<Car>(Constant.CAR_URL, carToUpdate);
  }
}
