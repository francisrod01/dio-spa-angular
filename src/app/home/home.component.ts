import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DialogUserComponent } from '../dialog-user/dialog-user.component';

import { User } from '../shared/models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'spa-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['id', 'avatar', 'name', 'email', 'createdAt', 'actions'];
  users$!: Observable<User[]>;

  constructor(
    public dialog: MatDialog,
    private userSrv: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.users$ = this.userSrv.getUsers()
      .pipe(map(values => values ?? []));
  }

  openEdit(elem: any): void {
    console.log('[DEBUG] edit elem: ', elem);
    const dialogRef = this.dialog.open(DialogUserComponent, {
      width: '250px',
      data: {...elem},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('[DEBUG] dialog closed: ', result);
    });
  }
}
