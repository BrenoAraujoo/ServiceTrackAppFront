import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserFormService {


  private userForm!: FormGroup;
  constructor() { }

  setUserForm(form: FormGroup) {
    this.userForm = form;
  }
  getUserForm(): FormGroup {
    return this.userForm;
  }
}
