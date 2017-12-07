import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the HaversineProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class HaversineProvider {

  constructor(public http: Http) {
    console.log('Hello HaversineProvider Provider');
  }

  public toRad(x:number){
    return x * Math.PI / 180;
  }
  public haversine (lat1,long1,lat2,long2) : number{
    var R = 6371; // km
    //has a problem with the .toRad() method below.
    var x1 = lat2-lat1;
    var dLat = this.toRad(x1);
    var x2 = long2-long1;
    var dLon = this.toRad(x2);
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                    Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
                    Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c * 1000;

    return Math.round(d);
  }

}
