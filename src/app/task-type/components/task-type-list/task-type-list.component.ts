import { Component, OnInit} from '@angular/core';
import { SharedModuleModule } from '../../../shared/shared-module/shared-module.module';
import { TaskTypeService } from '../../services/task-type.service';
import { TaskTypeDetail } from '../../models/task-type-detail.model';
import { Router } from '@angular/router';
import { ToastService } from '../../../shared/toastr-services/toast-service';
import { ApiResponse } from '../../../core/api-response/api-response.model';

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
    private toastService: ToastService,
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

  getTaskTypes():void {
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

  deleteTaskType(taskTypeId: string):void{
    this.taskTypeService.deleteTaskType(taskTypeId).subscribe({
      next: (response) => {
        const isSuccess = response.isSuccess;
        if(isSuccess){
          this.toastService.showSuccess('Sucesso na exclusão tipo de tarefa',`Tarefa removida com sucesso!`);
          this.updateTaskTypesList(taskTypeId);
        }
      },
      error: (err) =>{
        if(err.error){
          const errorResponse = err.error;
          this.toastService.showErro('Erro na exclusão tipo de tarefa',`Código: ${errorResponse.code} - Mesagem: ${errorResponse.message}`)
        }else{
          this.toastService.showErro('Erro na exclusão  do tipo de tarefa',err);
        }
      }
    })
  }
  changeTaskTypeStatus(taskTypeId: string, status: boolean) {
    this.taskTypeService.changeTaskTypeStatus(taskTypeId, status).subscribe({
      next: (response: ApiResponse<void>) =>{
        if(response.isSuccess){
          this.toastService.showSuccess('Alteração de tipo de tarefa', `Tipo de tarefa ${status ? 'ativado' : 'desativado'} com sucesso`)

          // Atualiza a lista de tasktype de forma imutável
          this.tasksTypes = this.tasksTypes.map(tasksType =>
            tasksType.id === taskTypeId ? { ...tasksType, active: status } : tasksType)
        }
      },
      error: (err: any)=>{
        this.toastService.showWarnig('Alteração de tipo de tarefa', ` ${err.message}`)
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
