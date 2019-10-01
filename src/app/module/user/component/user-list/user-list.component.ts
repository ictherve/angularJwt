import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {User} from '../../../../model/user';
import {Router} from '@angular/router';
import {UserService} from '../../../../service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  dataSource = new MatTableDataSource<User>();
  dataSourceUpdate = new MatTableDataSource<User>();

  displayedColumns = ['id', 'username', 'email', 'birthday', 'details', 'update', 'delete'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatPaginator) paginatorUpdate: MatPaginator;

  users: User[] = [];

  pageSizeOptions: number[] = [2, 4, 6];

  size: number = this.pageSizeOptions[0];
  page = 0;
  length: number;

  constructor(private router: Router,
              private userService: UserService) {
  }

  ngOnInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSourceUpdate.paginator = this.paginatorUpdate;
    this.getNumberOfUserInDatabase();
    this.findByPageIndexAndSize();
  }

  /**
   *Retrieve all the users. This method is not used yet!!!!!!!!!!!!!!!!!!!!!
   */
  findAll() {
    this.userService.findAll().subscribe(owners => {
      this.dataSource.data = owners;
      this.users = owners;
      console.log(JSON.stringify(owners));
    });
  }

  /**
   * Retrieve the users in the databases given :
   * <ul>
   *     <li>page : the actual page index</li>
   *     <li>size : the actual number of element displayed on each page/Table</li>
   * </ul>
   */
  findByPageIndexAndSize() {

    console.log('Size : ' + this.size, 'Page : ' + this.page);
    this.userService.findAllPages(this.page, this.size).subscribe(owners => {
      this.dataSource.data = owners;
      this.users = owners;
      console.log(JSON.stringify(owners));
    });
  }

  /**
   * Retrieve from the number of users
   */
  getNumberOfUserInDatabase() {

    this.userService.getNumberOfUsers().subscribe(size => {
      this.length = Number(size);
    });
  }

  /**
   * Redirect to the user-detail component in order to display a user details given an id
   * @param id : the database id of the user to display the details
   */
  redirectToDetails(id: number) {

    this.router.navigate(['/user', id]);
  }

  /**
   * Redirect to the user-update component in order to update a user given an id
   * @param id : the database id of the user to update
   */
  redirectToUpdate(id: number) {

    this.router.navigate(['/update', id]);
  }

  /**
   * This method deletes a user given an id(if it exist in the database) and reload the page the page by looking in the database
   * the others users
   * @param id : the id in the database of the User to delete
   */
  delete(id: number) {
    this.userService.delete(id).subscribe(value => {
      console.log('User successfully deleted !!');
      this.findByPageIndexAndSize();
    });
  }

  /**
   * This method is called each time we click on the next button of the paginator (In the Html) and update the
   * given arguments:
   * <ul>
   *     <li>page : the actual page index</li>
   *     <li>size : the actual number of element displayed on each page/Table</li>
   * </ul>
   * retrieve the users based on page and size values
   * @param event : event property
   */
  onPageChange(event: any) {

    this.size = event.pageSize;
    this.page = event.pageIndex;
    this.findByPageIndexAndSize();
  }

}
