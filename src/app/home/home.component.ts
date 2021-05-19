import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { from, Observable } from 'rxjs';
import { map, mergeMap, toArray } from 'rxjs/operators';

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
    const dialogRef = this.dialog.open(DialogUserComponent, {
      width: '250px',
      data: {...elem},
    });

    dialogRef.afterClosed().subscribe((result: User) => {
      this.users$ = this.users$.pipe(
        mergeMap(data =>
          from(data).pipe(
            map(item => {
              if (item.id === result.id) {
                const newItem: User = result;

                return {...item, ...newItem};
              }

              return item;
            }),
            toArray()
          )
        ),
      );
    });
  }
}
