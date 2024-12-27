/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TaskTypeService } from './task-type.service';

describe('Service: TaskType', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskTypeService]
    });
  });

  it('should ...', inject([TaskTypeService], (service: TaskTypeService) => {
    expect(service).toBeTruthy();
  }));
});
