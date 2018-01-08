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
    headers.append('Content-Type', 'application/json');

    return this.http
    .post(
      'http://localhost:3000/task',
      JSON.stringify({task}),
      {headers: headers}
    )
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  markTaskAsDone() {
    console.log("From the service: Moving task to the list of finished tasks...");
  }

  /*
  editTask(task) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http
    .put(
      'http://localhost:3000/task',
      JSON.stringify({task}),
      {headers: headers}
    )
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }
  */

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }
}

/*
  /*
  exports.updateTask = function(req, callback) {
    Task.findById(req.params.id, function(err, task) {
        if(err) {
            res.json({err: 'Task could not be found!'});
        } else {
            if(req.body.title) task.title = req.body.title;
            if(req.body.description) task.description = req.body.description;

            task.save(function(error, task) {
                if(error) {
                    callback({error: 'The could not be saved!'});
                } else {
                    callback(task);
                }
            });
        }
    });
};
*/