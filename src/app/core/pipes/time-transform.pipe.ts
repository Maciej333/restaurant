import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeTransform'
})
export class TimeTransformPipe implements PipeTransform {

  transform(value: number): string {
    let result: string = '';
    result += Math.floor(value/60)+"h ";
    result += value%60+"m";
    return result;
  }

}
