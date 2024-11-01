import { Component, OnInit } from '@angular/core';
import { SharedModuleModule } from '../../../shared/shared-module/shared-module.module';
import { UserFormService } from '../../services/user-form.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-tab-config',
  templateUrl: './user-tab-config.component.html',
  styleUrls: ['./user-tab-config.component.scss'],
  standalone: true,
  imports: [
    SharedModuleModule]
})
export class UserTabConfigComponent implements OnInit {

  userForm!: FormGroup;
  constructor(private userFormService: UserFormService) { }

  ngOnInit() {
    this.userForm = this.userFormService.getUserForm();
  }

}
