import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutingModule } from './routing.module';

import { SharedModule } from '../shared/shared.module';

import { HomeComponent } from './components/home/home.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectComponent } from './components/project/project.component';
import { TaskComponent } from './components/task/task.component';
import { TaskEntryComponent } from './components/task-entry/task-entry.component';

@NgModule({
  imports: [
    CommonModule,
    RoutingModule,
    SharedModule
  ],
  declarations: [
    HomeComponent,
    ProjectsComponent,
    ProjectComponent,
    TaskComponent,
    TaskEntryComponent
  ]
})
export class WorkModule { }
