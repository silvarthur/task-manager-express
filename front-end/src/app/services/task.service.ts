import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class TaskService {
  constructor(private http: Http) { 
    console.log('Task service initialized...')
  }

  getAllTasks() {
    return this.http
    .get('http://localhost:3000/task')
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  createTask(task) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json')

    return this.http
    .post('http://localhost:3000/task', JSON.stringify({task}), {
      headers: headers
    })
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }
}
