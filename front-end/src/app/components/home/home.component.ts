import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { StatusPipe } from '../../status.pipe';
import { Task } from '../../models/task';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  tasks: Task[] = [];
  task: Task;
  editModalRef;

  constructor(private taskService: TaskService,
    private modalService: NgbModal,
    private app: AppComponent) { }

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

  showEditModal(task: Task, modal) {
    this.task = task;
    this.editModalRef = this.modalService.open(modal);
  }

  editTask(task: Task, newTitle, newDescription) {
    task.title = newTitle;
    task.description = newDescription;

    this.taskService.editTask(task)
    .subscribe(
      result => console.log(result), 
      error => console.log('editTask - Error: ' + error)
    );

    this.closeEditModal();
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

  closeEditModal() {
    this.editModalRef.close();
  }

  ngOnInit() { 
    this.getAllTasks();
  }
}