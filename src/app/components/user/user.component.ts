import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  user: any;

  constructor(private auth: AuthService, private route: ActivatedRoute) {
    // console.log(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.getUser(this.route.snapshot.paramMap.get('id'));
  }

  getUser(id) {
    this.auth.getUserAPI(id).subscribe((val: any) => {
      this.user = val;
    });
  }
}
