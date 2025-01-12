import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskTypeService } from '../../../services/task-type.service';
import { ActivatedRoute } from '@angular/router';
import { ApiResponse } from '../../../../core/api-response/api-response.model';
import { TaskTypeDetail } from '../../../models/task-type-detail.model';
import { SharedModuleModule } from '../../../../shared/shared-module/shared-module.module';
import { ToastService } from '../../../../shared/toastr-services/toast-service';
import { TaskTypeCreateModel } from '../../../models/task-type-create.model';
import { TaskTypeUpdateModel } from '../../../models/task-type-update.model';

@Component({
  selector: 'app-task-type-create-edit',
  templateUrl: './task-type-create-edit.component.html',
  styleUrls: ['./task-type-create-edit.component.scss'],
  standalone: true,
  imports: [SharedModuleModule],
})
export class TaskTypeCreateEditComponent implements OnInit{
  taskTypeForm!: FormGroup;
  taskTypeId: string | null = null;
  isEditMode: boolean = false;
  title: string ='Criar tipo de tarefa';
  taskTypeName: string = '';


  activeOptions: object[] =
    [
      { label: 'sim', value: true },
      { label: 'não', value: false }
    ];

  constructor(
    private fb: FormBuilder,
    private taskTypeService: TaskTypeService,
    private route: ActivatedRoute,
    private toastService: ToastService
  ) { }

  ngOnInit() {

    this.taskTypeForm = this.fb.group({
      id: [''],
      creatorId: [''],
      name: ['', Validators.required],
      description: [''],
      creatorName: new FormControl({value: '', disabled: true}),
      active: [''],
      creationDate: new FormControl({ value: '', disabled: true }),
      updateDate: new FormControl({ value: '', disabled: true })
    });

    this.route.paramMap.subscribe(params => {

      this.taskTypeId = params.get('id');
      this.isEditMode = this.taskTypeId != null;

      if (this.isEditMode && this.taskTypeId) {
        this.taskTypeService.getTaskTypesById(this.taskTypeId).subscribe((response: ApiResponse<TaskTypeDetail>) => {
          const { isSuccess, data } = response;
          if (isSuccess && data) {
            const { id, creatorId, creatorName, name, description, creationDate, updateDate, active} = data;
            this.taskTypeForm.patchValue({
              id,
              creatorId,
              creatorName,
              name,
              description,
              creationDate,
              updateDate,
              active
            })
            this.taskTypeName = name;
            this.title = `Editar tipo de tarefa [${this.taskTypeName}]`
          }
        })
      }
    })
  }

  createTaskType(): void {
    
    if (!this.taskTypeForm.valid) {
      this.toastService.showWarnig('Criação de tipo de tarefa','Dados inválidos')
      return;
    }

    const {name, description} = this.taskTypeForm.value;
    const taskType: TaskTypeCreateModel = {name, description};

    this.taskTypeService.createTaskType(taskType).subscribe({
      next: (response) =>{

        const {isSuccess, data} = response;
        if(isSuccess && data){
          
          const taskTypeDetail: TaskTypeDetail = data;
          
          this.taskTypeForm.patchValue({
            creatorId: taskTypeDetail.creatorId,
            creatorName: taskTypeDetail.creatorName,
            name: taskTypeDetail.name,
            description: taskTypeDetail.description,
            creationDate: taskTypeDetail.creationDate,
            updateDate: taskTypeDetail.updateDate
          })
          this.taskTypeName = taskType.name;
          this.toastService.showSuccess('Sucesso','Atividade criada com sucesso!');
        }
      },
      error:(err)=>{
        if(err.error){
          const errorResponse = err.error;
          this.toastService.showErro('Erro na criação do tipo de tarefa',`Código: ${errorResponse.code} - Mesagem: ${errorResponse.message}`)
        }else{
          this.toastService.showErro('Erro na criação do tipo de tarefa',err.detail);
        }
      }
    })
  }

  updateTaskType(): void {

    if(!this.taskTypeForm.valid){
      this.toastService.showWarnig('Erro na atualização de tipo de tarefa','Dados inválidos')
      return;
    }
    
    const {name, description, active} = this.taskTypeForm.value;
    const taskTypeUpdateModel: TaskTypeUpdateModel = {name, description, active};

    this.taskTypeService.updateTaskType(taskTypeUpdateModel, this.taskTypeId!).subscribe({
      next: (response) =>{
          if(response.isSuccess){
            this.toastService.showSuccess('Atualização de tipo de tarefa','Tarefa atualizada com sucesso!')
          }else{
            this.toastService.showErro('Erro atualização de tipo de tarefa','Não foi possível atualizar a tarefa')
          }
      },
      error: (err ) =>{
        if(err.error){
          const errorResponse = err.error;
          this.toastService.showErro('Erro na criação do tipo de tarefa',`Código: ${errorResponse.code} - Mesagem: ${errorResponse.message}`)
        }else{
          this.toastService.showErro('Erro na criação do tipo de tarefa',err);
        }
      }
    })
  }
}
