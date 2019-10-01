import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';
import {CarDTO} from '../../../../model/car-dto';
import {CarService} from '../../../../service/car.service';
import {AuthService} from '../../../../service/auth.service';
import {Car} from '../../../../model/car';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {

  dataSource = new MatTableDataSource<Car>();
  dataSourceSoldCars = new MatTableDataSource<Car>();
  displayedColumns = ['id', 'brand', 'model', 'sold', 'creation', 'details', 'update', 'delete'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatPaginator) paginatorSoldCars: MatPaginator;

  username: string;

  pageSizeOptions: number[] = [4, 10, 15];

  size: number = this.pageSizeOptions[0];
  page = 0;
  length: number;

  pageSizeOptionsSold: number[] = [4, 6, 10];

  sizeSold: number = this.pageSizeOptionsSold[0];
  pageSold = 0;
  lengthSold: number;

  constructor(private _router: Router,
              private _carService: CarService,
              private _authService: AuthService) {
  }

  ngOnInit() {

    this._authService.username.subscribe(value => this.username = value);
    this.dataSource.paginator = this.paginator;
    this.dataSourceSoldCars.paginator = this.paginatorSoldCars;
    this.countNumberOfCars(); // set le nombre voiture vendus et non vendus depuis la base de données
    this.findUnSoldCars();  // récupere les voitures non vendus
    this.findSoldCars(); // récupere les voitures vendus
  }

  findAll() {
    this._carService.findAll().subscribe(cars => {
      this.dataSource.data = cars;
    });
  }

  findUnSoldCars() {

    // console.log('Size : ' + this.size, 'Page : ' + this.page);
    this._carService.findUnSoldCars(this.page, this.size).subscribe(cars => {
      this.dataSource.data = cars;
      // console.log(JSON.stringify(this.dataSource.data));
    });
  }

  findSoldCars() {

    // console.log('Size : ' + this.sizeSold, 'Page : ' + this.pageSold);
    this._carService.findSoldCars(this.pageSold, this.sizeSold).subscribe(cars => {
      this.dataSourceSoldCars.data = cars;
      // console.log(JSON.stringify(this.dataSourceSoldCars.data));
    });
  }

  countNumberOfCars() {

    this._carService.countNumberOfCars(this.username).subscribe(size => {
      this.length = Number(size[1]);
      this.lengthSold = Number(size[0]);
      // console.log('All cars : ' + JSON.stringify(size));
    });
  }

  redirectToDetails(id: number) {

    this._router.navigate(['/cars', id]);
  }

  redirectToUpdate(id: number) {

    this._router.navigate(['/update', id]);
  }


  // Cette méthode est appelée quand on clique sur la pagination de la table non vendus
  onPageChange(event: any) {

    this.size = event.pageSize;
    this.page = event.pageIndex;

    this.findUnSoldCars();
  }

  // Cette méthode est appelée quand on clique sur la pagination de la table vendus
  onPageChangeForSoldCars(event: any) {

    this.sizeSold = event.pageSize;
    this.pageSold = event.pageIndex;

    this.findSoldCars();
  }

}
