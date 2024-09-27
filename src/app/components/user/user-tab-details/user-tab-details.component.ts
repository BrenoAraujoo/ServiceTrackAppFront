import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { UserFormService } from '../../../services/user-services/user-form.service';


@Component({
  selector: 'app-user-tab-details',
  templateUrl: './user-tab-details.component.html',
  styleUrls: ['./user-tab-details.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class UserTabDetailsComponent implements OnInit {

  userForm!: FormGroup;
  constructor(private userFormService: UserFormService) { }

  ngOnInit() {
   this.userForm = this.userFormService.getUserForm();
   console.log(this.userForm);
  }

}
