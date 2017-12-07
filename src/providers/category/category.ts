import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {UserData} from '../../data/userData'


/*
  Generated class for the CategoryProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CategoryProvider {
  category : string = "All";
  actifUser : UserData = new UserData();
  maxDistance : number = 5000;
  sortType:string = "Time";

  constructor() {
  }

}
