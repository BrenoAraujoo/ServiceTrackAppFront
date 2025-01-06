import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskTypeService } from '../../../services/task-type.service';
import { ActivatedRoute } from '@angular/router';
import { ApiResponse } from '../../../../core/api-response/api-response.model';
import { TaskTypeDetail } from '../../../models/task-type-detail.model';
import { SharedModuleModule } from '../../../../shared/shared-module/shared-module.module';

@Component({
  selector: 'app-task-type-create-edit',
  templateUrl: './task-type-create-edit.component.html',
  styleUrls: ['./task-type-create-edit.component.scss'],
  standalone: true,
  imports: [SharedModuleModule],
})
export class TaskTypeCreateEditComponent implements OnInit {
  taskTypeForm!: FormGroup;
  taskTypeId: string | null = null;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private taskTypeService: TaskTypeService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.taskTypeForm = this.fb.group({
      id: [''],
      creatorId: [''],
      name: ['', Validators.required],
      description: [''],
      creatorName: [''], 
      active: [''],
      creationDate: new FormControl({value:'',disabled:true}),
      updateDate: ['']
    });

    this.route.paramMap.subscribe(params => {

      this.taskTypeId = params.get('id');
      this.isEditMode = this.taskTypeId != null;

      if (this.isEditMode && this.taskTypeId) {
        this.taskTypeService.getTaskTypesById(this.taskTypeId).subscribe((response: ApiResponse<TaskTypeDetail>) => {
          if(response.isSuccess && response.data != null)
          this.taskTypeForm.patchValue({
            id: response.data?.id,
            creatorId: response.data?.creatorId,
            name: response.data?.name,
            description: response.data?.description,
            creationDate: response.data?.creationDate
          })
        })
      }
    })
  }

  createTaskType(): void {
    if(this.taskTypeForm.valid){
      
    }
  }

  updateTaskType(): void {
    console.log('atualizando');
  }

}
