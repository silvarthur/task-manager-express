import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { StatusPipe } from '../../status.pipe'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  //pipes: [StatusPipe]
})
export class HomeComponent implements OnInit {
  tasks: any = [];

  constructor(private taskService: TaskService) { }

  getAllTasks() {
    this.taskService.getAllTasks()
    .subscribe(
      result => this.tasks = result,
      error => console.log('Error: ' + error),
      () => console.log(this.tasks)
    );
  }

  ngOnInit() { 
    this.getAllTasks();
  }
}
