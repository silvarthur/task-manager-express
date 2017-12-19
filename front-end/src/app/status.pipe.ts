import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(tasks: any, status: any): any {
    console.log('TASKS:', tasks);
    return tasks.filter(function(task) {
      return task.status == status;
    });
  }

}
