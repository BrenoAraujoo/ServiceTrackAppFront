import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskTypeService } from '../../../services/task-type.service';
import { ActivatedRoute } from '@angular/router';
import { ApiResponse } from '../../../../core/api-response/api-response.model';
import { TaskTypeDetail } from '../../../models/task-type-detail.model';
import { SharedModuleModule } from '../../../../shared/shared-module/shared-module.module';
import { ToastService } from '../../../../shared/toastr-services/toast-service';
import { TaskTypeCreateModel } from '../../../models/task-type-create.model';

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
            const { id, creatorId, creatorName, name, description, creationDate, updateDate } = data;
            this.taskTypeForm.patchValue({
              id,
              creatorId,
              creatorName,
              name,
              description,
              creationDate,
              updateDate
            })
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
    const taskType: TaskTypeCreateModel = this.taskTypeForm.value;
    console.log(`desc: ${taskType.description}, ${taskType.name}`)
  }

  updateTaskType(): void {
    const taskType = this.taskTypeForm.get('description')?.value;

    console.log(`teste ${taskType}`)
  }

}
