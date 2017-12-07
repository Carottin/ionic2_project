import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the ReversePipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
 @Pipe({
   name: 'reverse',
   pure: false
 })
 export class ReversePipe {
   transform(value) {
     return value.slice().reverse();
   }
 }
