import { Component, OnInit } from '@angular/core';
import { UserFormService } from '../../services/user-form.service';
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
  userTypes: object[] | undefined;

  constructor(private userFormService: UserFormService) { }

  ngOnInit() {
   this.userForm = this.userFormService.getUserForm();


   this.userTypes = [
    { label: 'Administrador', value: 'Admin' },
    { label: 'Usuário', value: 'User' },
    { label: 'Gestor', value: 'Manager' }
  ];
  
  }

}
