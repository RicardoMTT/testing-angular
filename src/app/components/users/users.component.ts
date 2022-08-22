import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: any[];
  user: any;
  arreglo: any[] = [1, 2, 3, 4, 5];
  totalUsers: number;
  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.auth.getUsersAPI().subscribe((resp: any) => {
      this.users = resp.data;
      this.totalUsers = resp.total;
    });
  }

  clearArray() {
    this.arreglo = [];
  }
}
