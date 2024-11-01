/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserFormService } from './user-form.service';

describe('Service: UserForm', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserFormService]
    });
  });

  it('should ...', inject([UserFormService], (service: UserFormService) => {
    expect(service).toBeTruthy();
  }));
});
