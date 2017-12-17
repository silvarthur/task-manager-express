import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { TaskComponent } from './components/task/task.component';

import { TaskService } from './services/task.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})

export class AppModule { }
