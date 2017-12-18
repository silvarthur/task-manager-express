import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'taskPipe'
})
export class Task.PipePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
