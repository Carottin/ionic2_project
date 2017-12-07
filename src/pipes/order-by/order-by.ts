import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

/**
 * Generated class for the OrderByPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'order-by',
})
export class OrderByPipe implements PipeTransform {
  transform(array, args) {
    return _.sortBy(array, args);
  }
}
