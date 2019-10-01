import {Injectable} from '@angular/core';
import {User} from '../model/user';
import {BehaviorSubject, Observable} from 'rxjs';
import {Constant} from '../util/constant';
import {HttpClient} from '@angular/common/http';
import {UserAuth} from '../model/user-auth';
import {map, tap} from 'rxjs/operators';
import {TokenStorageService} from './token-strorage.service';
import {Credential} from '../model/credential';

/**
 * Ce service : <br/>
 * <ul>
 *     <li>Connecte et deconnecte un user existant en base de donnée</li>
 *     <li>Met à jour les behaviorSubject qu'elle possède</li>
 * </ul>
 */

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // la route précédente
  private _previousRoute: string;

  // BehaviorSubject qui garde/met à jour le token et le username du user connecté
  private _authToken = new BehaviorSubject<UserAuth>(this._tokenStorage.getUserAuth());

  // BehaviorSubject qui garde/met à jour l'état user s'il est connecté
  public readonly isUserLoggedIn: Observable<boolean> = this._authToken.asObservable().pipe(
    map((token: UserAuth) => token.token != null)
  );

  // BehaviorSubject qui garde/met à jour le username user connecté
  public readonly username: Observable<string> = this._authToken.asObservable().pipe(
    map((token: UserAuth) => token.username)
  );

  constructor(private _http: HttpClient,
              private _tokenStorage: TokenStorageService) {
  }

  public save(user: User): Observable<any> {

    return this._http.post(Constant.URL + '/save', user);
  }

  // Connecte un user existant et met à jour les behaviorSubject de ce service
  login(credential: Credential): Observable<boolean> {

    return this._http.post(Constant.LOGIN_URL, credential).pipe(
      tap((data: UserAuth) => {
        this._tokenStorage.saveToken(data);
        this._authToken.next(data);
      }),
      map(data => data.token != null),
    );
  }

  // Vide le SessionStorage et met à jour les  behaviorSubject de ce service
  logOut() {
    this._tokenStorage.clear();
    this._authToken.next(this._tokenStorage.getUserAuth());
    console.log(this._tokenStorage.getUserAuth());
  }

}
