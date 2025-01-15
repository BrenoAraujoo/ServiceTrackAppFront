import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskTypeListComponent } from './task-type-list.component';

describe('TaskTypeComponent', () => {
  let component: TaskTypeListComponent;
  let fixture: ComponentFixture<TaskTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskTypeListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
