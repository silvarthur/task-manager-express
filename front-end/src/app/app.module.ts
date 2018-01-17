import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

import { TaskService } from './services/task.service';
import { StatusPipe } from './status.pipe';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { Routing } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StatusPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgbModule.forRoot(),
    Routing
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})

export class AppModule { }
