import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit{
  user: any;

  constructor(private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit(): void {
    const userId = Number(this.route.snapshot.paramMap.get('id'));  // Obtém o ID da URL
    this.userService.getUserById(userId).subscribe(data => {
      this.user = data;
    });
  }
}
