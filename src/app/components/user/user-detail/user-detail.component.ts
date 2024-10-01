import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user-services/user.service';
import { User } from '../../models/user/user.model';
import { ApiResponse } from '../../models/api-response.model';
import { SharedModuleModule } from '../../../shared/shared-module/shared-module.module';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [SharedModuleModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit{
  user!: User;

  constructor(private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit(): void {
    const userId = String(this.route.snapshot.paramMap.get('id'));  // Obtém o ID da URL
    this.userService.getUserById(userId).subscribe((response: ApiResponse<User>) => {
      if(response.isSuccess){
        this.user = response.data;
        console.log(this.user?.name)
      }
      else{
        console.log('erro user')
      }
    });
  }
}
