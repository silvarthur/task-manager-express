import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {
  transform(tasks: any, status: any): any {
    return tasks.filter(function(task) {
      return task.status == status;
    });
  }
}
