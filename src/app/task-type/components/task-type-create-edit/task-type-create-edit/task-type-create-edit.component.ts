import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskTypeService } from '../../../services/task-type.service';
import { ActivatedRoute } from '@angular/router';
import { TaskTypeDetail } from '../../../models/task-type-detail.model';
import { SharedModuleModule } from '../../../../shared/shared-module/shared-module.module';
import { ToastService } from '../../../../shared/toastr-services/toast-service';
import { TaskTypeCreateModel } from '../../../models/task-type-create.model';
import { TaskTypeUpdateModel } from '../../../models/task-type-update.model';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { GlobalErrorHandlerService } from '../../../../core/error/global-error-handler.service';

@Component({
  selector: 'app-task-type-create-edit',
  templateUrl: './task-type-create-edit.component.html',
  styleUrls: ['./task-type-create-edit.component.scss'],
  standalone: true,
  imports: [SharedModuleModule],
})
export class TaskTypeCreateEditComponent implements OnInit, OnDestroy {
  taskTypeForm!: FormGroup;
  taskTypeId: string | null = null;
  isEditMode: boolean = false;
  title: string = 'Criar tipo de tarefa';
  taskTypeName: string = '';
  private _subscription: Subscription = new Subscription();


  activeOptions: object[] =
    [
      { label: 'sim', value: true },
      { label: 'não', value: false }
    ];

  constructor(
    private _fb: FormBuilder,
    private _taskTypeService: TaskTypeService,
    private _route: ActivatedRoute,
    private _toastService: ToastService,
    private _erroHandlerService: GlobalErrorHandlerService
  ) { }
  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  ngOnInit() {
    this.initializeTaskTypeForm();

  }

  initializeTaskTypeForm(): void {

    this.taskTypeForm = this._fb.group({
      id: [''],
      creatorId: [''],
      name: ['', Validators.required],
      description: [''],
      creatorName: new FormControl({ value: '', disabled: true }),
      active: [''],
      creationDate: new FormControl({ value: '', disabled: true }),
      updateDate: new FormControl({ value: '', disabled: true })
    });

    this._subscription.add(
      this._route.paramMap.subscribe(params => {

        this.taskTypeId = params.get('id');
        this.isEditMode = this.taskTypeId != null;

        if (this.isEditMode && this.taskTypeId) {
          this._taskTypeService.getTaskTypesById(this.taskTypeId).subscribe({

            next: (response) => {
              const { isSuccess, data, error } = response;
              if (!isSuccess && error) {
                this._toastService.showErro('Erro ao carregar tipo de tarefa', error.message);
                return;
              }
              const { id, creatorId, creatorName, name, description, creationDate, updateDate, active } = data!;
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
            },
            error: (err: HttpErrorResponse) => {
              this._erroHandlerService.handleError(err);
            }
          })
        }
      }))
  }

  createTaskType(): void {

    if (!this.taskTypeForm.valid) {
      this._toastService.showWarning('Criação de tipo de tarefa', 'Dados inválidos')
      return;
    }

    const { name, description } = this.taskTypeForm.value;
    const taskType: TaskTypeCreateModel = { name, description };
    this._subscription.add(
      this._taskTypeService.createTaskType(taskType).subscribe({
        next: (response) => {

          const { isSuccess, data } = response;
          if (isSuccess && data) {

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
            this._toastService.showSuccess('Sucesso', 'Atividade criada com sucesso!');
          }
        },
        error: (err) => {
          this._erroHandlerService.handleError(err);
        }
      }))
  }

  updateTaskType(): void {

    if (!this.taskTypeForm.valid) {
      this._toastService.showWarning('Erro na atualização de tipo de tarefa', 'Dados inválidos')
      return;
    }

    const { name, description, active } = this.taskTypeForm.value;
    const taskTypeUpdateModel: TaskTypeUpdateModel = { name, description, active };

    this._subscription.add(
      this._taskTypeService.updateTaskType(taskTypeUpdateModel, this.taskTypeId!).subscribe({
        next: (response) => {
          if (response.isSuccess) {
            this._toastService.showSuccess('Atualização de tipo de tarefa', 'Tarefa atualizada com sucesso!')
          } else {
            this._toastService.showErro('Erro atualização de tipo de tarefa', 'Não foi possível atualizar a tarefa')
          }
        },
        error: (err) => {
          this._erroHandlerService.handleError(err);
        }
      }))
  }
}
