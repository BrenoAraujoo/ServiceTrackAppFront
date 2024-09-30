import { Component, OnInit } from '@angular/core';
import { UserFormService } from '../../../services/user-services/user-form.service';
import { SharedModuleModule } from '../../../shared/shared-module/shared-module.module';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-user-tab-details',
  templateUrl: './user-tab-details.component.html',
  styleUrls: ['./user-tab-details.component.scss'],
  standalone: true,
  imports: [SharedModuleModule]
})
export class UserTabDetailsComponent implements OnInit {

  userForm!: FormGroup;
  userTypes: string[] | undefined;

  constructor(private userFormService: UserFormService) { }

  ngOnInit() {
   this.userForm = this.userFormService.getUserForm();
   console.log(this.userForm);

   this.userTypes = ['Usuário','Gestor','Administrador']
  }

}
