import { Component, OnInit} from '@angular/core';
import { SharedModuleModule } from '../../../shared/shared-module/shared-module.module';
import { TaskTypeService } from '../../services/task-type.service';
import { TaskType } from '../../models/task-type.model';
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
  tasksTypes: TaskType[] = [];
  currentItem: any = 'Televisao';


  constructor(
    private taskTypeService: TaskTypeService,
     private router: Router) { }

  ngOnInit(): void {

    this.getTaskTypes();
  }


  viewTaskType(taskTypeId: string){
    this.router.navigate([`/taskType/${taskTypeId}`]);
  }

  getTaskTypes() {
    this.taskTypeService.getTaskTypes().subscribe({

     next: (response) => {
      if(response.isSuccess && response.data != null){
        console.log(response.data)
        this.tasksTypes = response.data.entityList;
        this.totalTasks = response.data?.totalItems;
      }

      },
      error: (err) => {
        console.log(err.message)
      }

    })
  }

  getTaskTypeStatus(taskType: TaskType) {
    return taskType.active ? 'ativo' : 'inativo';
  }


}
