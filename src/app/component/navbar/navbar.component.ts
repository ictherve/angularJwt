import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isUserLoggedIn: boolean;
  username: string;

  constructor(private _authService: AuthService) {
  }

  ngOnInit() {

    this._authService.isUserLoggedIn.subscribe(isLoggedIn => this.isUserLoggedIn = isLoggedIn);
    this._authService.username.subscribe(username => this.username = username);
  }

  logOut() {
    this._authService.logOut();
  }

}
