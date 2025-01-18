import { Component, OnInit} from '@angular/core';
import { SharedModuleModule } from '../../../shared/shared-module/shared-module.module';
import { TaskTypeService } from '../../services/task-type.service';
import { TaskTypeDetail } from '../../models/task-type-detail.model';
import { Router } from '@angular/router';
import { ToastService } from '../../../shared/toastr-services/toast-service';
import { ApiResponse } from '../../../core/api-response/api-response.model';
import { GlobalErrorHandlerService } from '../../../core/error/global-error-handler.service';
import { HttpErrorResponse } from '@angular/common/http';


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
    private _taskTypeService: TaskTypeService,
    private _toastService: ToastService,
    private _router: Router,
    private _erroHandlerService: GlobalErrorHandlerService) { }

  ngOnInit(): void {
      this.getTaskTypes();
  }

  createTaskType(): void{
  this._router.navigate(['taskType/create'])
  }
  viewTaskType(taskTypeId: string): void{
    this._router.navigate([`/taskType/${taskTypeId}`]);
  }

  getTaskTypes():void {
  
    this._taskTypeService.getTaskTypes().subscribe({

     next: (response) => {

      const {isSuccess, data} = response;
      
      if(isSuccess && data){
        this.tasksTypes = data.entityList;
        this.totalTasks = data.totalItems;
        this._toastService.showSuccess('Sucesso',`${data.totalItems} tipos de tarefas foram encontradas`);
      }

      },
      error: (err) => {
        this._erroHandlerService.handleError(err);
      }

    })
  }

  deleteTaskType(taskTypeId: string):void{
    this._taskTypeService.deleteTaskType(taskTypeId).subscribe({
      next: (response) => {
        const isSuccess = response.isSuccess;
        if(isSuccess){
          this._toastService.showSuccess('Sucesso na exclusão tipo de tarefa',`Tarefa removida com sucesso!`);
          this.updateTaskTypesList(taskTypeId);
        }
      },
      error: (err: HttpErrorResponse) =>{
        this._erroHandlerService.handleError(err);
      }
    })
  }
  changeTaskTypeStatus(taskTypeId: string, status: boolean) {
    this._taskTypeService.changeTaskTypeStatus(taskTypeId, status).subscribe({
      next: (response: ApiResponse<void>) =>{
        if(response.isSuccess){
          this._toastService.showSuccess('Alteração de tipo de tarefa', `Tipo de tarefa ${status ? 'ativado' : 'desativado'} com sucesso`)

          // Atualiza a lista de tasktype de forma imutável
          this.tasksTypes = this.tasksTypes.map(tasksType =>
            tasksType.id === taskTypeId ? { ...tasksType, active: status } : tasksType)
        }
      },
      error: (err: HttpErrorResponse)=>{
        this._erroHandlerService.handleError(err);
      }
    })
  }

  getTaskTypeStatus(taskType: TaskTypeDetail) : string {
    return taskType.active ? 'ativo' : 'inativo';
  }
  private updateTaskTypesList(taskTypeId: string): void{
    const index = this.tasksTypes.findIndex(tasktype => tasktype.id === taskTypeId);
    if(index !== -1)
      this.tasksTypes.splice(index,1) // remove pelo indice
  }
}
