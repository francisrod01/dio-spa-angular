import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  constructor(private userSrv: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.users$ = this.userSrv.getUsers()
      .pipe(map(values => values ?? []));
  }
}
