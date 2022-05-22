import { User } from './../../shared/user';
import { ApiService } from './../../shared/api.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-view-all',
  templateUrl: './view-all.component.html',
  styleUrls: ['./view-all.component.css']
})
export class ViewAllComponent implements OnInit {

  UserData : any = [];
  dataSource: MatTableDataSource<User>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = [
    '_id',
    'name',
    'phoneno',
    'action', 
  ];

  constructor(private userApi: ApiService) { 
    this.userApi.GetAllUser().subscribe((data) => {
      this.UserData = data;
      this.dataSource = new MatTableDataSource<User>(this.UserData);
      setTimeout(() => {
        this.dataSource.paginator =this.paginator;
      }, 0);
    });
  }

  ngOnInit(): void {
  }

  deleteUser(index: number, e) {
    console.log(index);
    console.log(e);
    if (window.confirm('Are you sure to delete this user!')) {
      const data = this.dataSource.data;
      data.splice(
        this.paginator.pageIndex * this.paginator.pageSize + index,
        1
      );
      this.dataSource.data = data;
      this.userApi.DeleteUser(e.id).subscribe();
    }
  }

}
