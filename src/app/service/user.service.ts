import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../model/user';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {Constant} from '../util/constant';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _allUsers = new BehaviorSubject<User[]>(null);

  constructor(private _http: HttpClient) {
  }

  public save(user: User): Observable<any> {

    return this._http.post(Constant.URL + '/save' , user);
  }

  /**
   * Retrieve all the users
   */
  public findAll(): Observable<User[]> {
    return this._http.get<User[]>(Constant.URL + '/all').pipe(
      tap(data => {
        this._allUsers.next(data);
        console.log(data);
      })
    );
  }

  /**
   * Delete a User given his id
   * @param id : id of the user to delete
   */
  public delete(id: number) {
    return this._http.delete(Constant.URL + '/delete/' + id);
  }

  /**
   * Retrieve a User given his id
   * @param id: id of the user to retrieve
   */
  public findById(id: number): Observable<User> {

    return this._http.get<User>(Constant.URL + '/id/' + id);
  }

  /**
   * Retrieve a User given his username
   * @param username: username of the user to retrieve
   */
  public findByUsername(username: string): Observable<User> {

    return this._http.get<User>(Constant.URL + '/' + username);
  }

  /**
   * Update a given User
   * @param user : User to update
   */
  public update(user: User) {
    return this._http.put(Constant.URL, user);
  }

  /**
   * Retrieve users given the index of the page in the table and the size(the number of user by page)
   * @param page : index of the actual page
   * @param size : number of user by page
   */
  findAllPages(page: number, size: number) {

    return this._http.get<User[]>(Constant.URL + '/allpages?' + 'page=' + page + '&size=' + size);
  }

  /**
   * Count the number of all the users
   */
  getNumberOfUsers() {
    return this._http.get(Constant.URL + '/size');
  }
}
