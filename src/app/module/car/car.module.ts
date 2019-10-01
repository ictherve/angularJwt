import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarCreateComponent } from './component/car-create/car-create.component';
import {AngularMaterialModule} from '../angular-material/angular-material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {Route, RouterModule} from '@angular/router';
import { CarListComponent } from './component/car-list/car-list.component';
import { CarDetailComponent } from './component/car-detail/car-detail.component';

const  routes: Route[] = [
  {path: 'create', component: CarCreateComponent},
  {path: 'cars', component: CarListComponent},
  {path: 'cars/:id', component: CarDetailComponent}
];

@NgModule({
  declarations: [CarCreateComponent, CarListComponent, CarDetailComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ]
})
export class CarModule { }
