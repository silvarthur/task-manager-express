import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { StatusPipe } from '../../status.pipe';
import { Task } from '../../models/task';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService, private modalService: NgbModal) { }

  getAllTasks() {
    this.taskService.getAllTasks()
    .subscribe(
      result => this.tasks = result,
      error => console.log('getAllTasks - Error: ' + error),
    );
  }

  addNewTask(title, description) {
    var task = new Task();

    task.title = title;
    task.description = description;
    task.status = false;

    this.taskService.createTask(task)
    .subscribe(
      result => this.tasks = this.tasks.concat(result),
      error => console.log('createTask - Error: ' + error)
    );
  }

  markTaskAsDone(id) {
    this.taskService.markTaskAsDone(id)
    .subscribe(
      result => {
        for (var i = 0; i <  this.tasks.length; i++) {
          if(this.tasks[i]._id === id) {
            this.tasks.splice(i,1);
            this.tasks = this.tasks.concat(result);
          }
       }
      },
      error => console.log('markTaskAsDone - Error: ' + error)
    );
  }

  showEditModal(modal) {
    this.modalService.open(modal);
  }

  removeTask(id) {
    this.taskService.removeTask(id)
    .subscribe(
      result => {
        for (var i = 0; i < this.tasks.length; i++) {
          if(this.tasks[i]._id === id) {
            this.tasks = this.tasks.filter(item => item != this.tasks[i]);
          }
        }
      },
      error => console.log('removeTask - Error: ' + error)
    );
  }

  ngOnInit() { 
    this.getAllTasks();
  }
}