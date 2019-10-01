import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthModule} from './module/auth/auth.module';
import { NavbarComponent } from './component/navbar/navbar.component';
import {Route, RouterModule} from '@angular/router';
import { WelcomeComponent } from './component/welcome/welcome.component';
import {AngularMaterialModule} from './module/angular-material/angular-material.module';
import {UserModule} from './module/user/user.module';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {Interceptor} from './interceptor/interceptor';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CarModule} from './module/car/car.module';

const routes: Route[] = [
  {path: 'welcome', component: WelcomeComponent},
  {path: '', redirectTo: 'welcome', pathMatch: 'full'},
  {path: '**', 'component': WelcomeComponent}];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    AuthModule,
    UserModule,
    CarModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
