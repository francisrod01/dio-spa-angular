import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import * as faker from 'faker';

import { User } from './shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const users: User[] = [
      {
        id: 11,
        name: faker.name.firstName(0),
        avatar: faker.image.avatar(),
        email: `${faker.name.firstName(0).toLowerCase()}@gmail.com`,
        createdAt: '2021-06-30',
        updatedAt: '2021-07-10',
      },
      {
        id: 12,
        name: faker.name.firstName(1),
        avatar: faker.image.avatar(),
        email: `${faker.name.firstName(1).toLocaleLowerCase()}@gmail.com`,
        createdAt: '2021-06-29',
        updatedAt: '2021-07-08',
      },
    ];
    return { users };
  }

  genId(users: User[]): number {
    return users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 11;
  }
}
