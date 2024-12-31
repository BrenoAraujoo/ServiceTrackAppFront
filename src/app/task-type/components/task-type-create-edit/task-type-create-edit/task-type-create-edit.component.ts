import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TaskTypeService } from '../../../services/task-type.service';
import { ActivatedRoute } from '@angular/router';
import { ApiResponse } from '../../../../core/api-response/api-response.model';
import { TaskType } from '../../../models/task-type.model';
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

  constructor(
    private fb: FormBuilder,
    private taskTypeService: TaskTypeService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.taskTypeForm = this.fb.group({
      id: [''],
      creatorId: [''],
      name: ['']
    });

    this.route.paramMap.subscribe(params => {

      this.taskTypeId = params.get('id');

      if (this.taskTypeId) {

        this.taskTypeService.getTaskTypesById(this.taskTypeId).subscribe((response: ApiResponse<TaskType>) => {
          this.taskTypeForm.patchValue({
            id: response.data?.id,
            creatorId: response.data?.creatorId,
            name: response.data?.name,
            
          })
        })
      }
    })



  }

}
