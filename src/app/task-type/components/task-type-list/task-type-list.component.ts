import { Component, OnInit} from '@angular/core';
import { SharedModuleModule } from '../../../shared/shared-module/shared-module.module';
import { TaskTypeService } from '../../services/task-type.service';
import { TaskTypeDetail } from '../../models/task-type-detail.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-type',
  standalone: true,
  imports: [SharedModuleModule],
  templateUrl: './task-type-list.component.html',
  styleUrl: './task-type-list.component.scss'
})
export class TaskTypeListComponent implements OnInit {

  totalTasks: number = 0;
  tasksTypes: TaskTypeDetail[] = [];

  constructor(
    private taskTypeService: TaskTypeService,
     private router: Router) { }

  ngOnInit(): void {

    this.getTaskTypes();
  }

  createTaskType(): void{
  this.router.navigate(['taskType/create'])
  }
  viewTaskType(taskTypeId: string): void{
    this.router.navigate([`/taskType/${taskTypeId}`]);
  }

  getTaskTypes() {
    this.taskTypeService.getTaskTypes().subscribe({

     next: (response) => {

      const {isSuccess, data} = response;
      
      if(isSuccess && data){
        this.tasksTypes = data.entityList;
        this.totalTasks = data.totalItems;
      }

      },
      error: (err) => {
        console.log(err.message)
      }

    })
  }

  getTaskTypeStatus(taskType: TaskTypeDetail) {
    return taskType.active ? 'ativo' : 'inativo';
  }


}
