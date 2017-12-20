import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { StatusPipe } from '../../status.pipe'
import { Task } from '../../models/task'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) { }

  getAllTasks() {
    this.taskService.getAllTasks()
    .subscribe(
      result => this.tasks = result,
      error => console.log('getAllTasks - Error: ' + error),
      () => console.log(this.tasks)
    );
  }

  addNewTask(title, description) {
    var task = new Task();

    task.title = title;
    task.description = description;
    task.status = false;

    this.taskService.createTask(task)
    .subscribe(
      result => {
        this.tasks = this.tasks.concat(result),
        console.log(this.tasks)
      },
      error => console.log('createTask - Error: ' + error)
    );
  }

  ngOnInit() { 
    this.getAllTasks();
  }
}
