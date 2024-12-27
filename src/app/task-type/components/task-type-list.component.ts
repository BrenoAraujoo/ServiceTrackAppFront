import { Component, OnInit } from '@angular/core';
import { SharedModuleModule } from '../../shared/shared-module/shared-module.module';
import { TaskTypeService } from '../services/task-type.service';

@Component({
  selector: 'app-task-type',
  standalone: true,
  imports: [SharedModuleModule],
  templateUrl: './task-type-list.component.html',
  styleUrl: './task-type-list.component.scss'
})
export class TaskTypeListComponent implements OnInit{

  
  constructor(private taskTypeService: TaskTypeService) {}

  tasksTypes: any[] = [];
  ngOnInit(): void {

    this.getTaskTypes();
  }

  getTaskTypes(){
    this.taskTypeService.getTaskTypes().subscribe({
      next: (response) =>{
        console.log(response.data)
        this.tasksTypes = response.data.entityList;
      },
      error: (err)=> {
        console.log(err.message)
      }
      
    })
  }
  

}
