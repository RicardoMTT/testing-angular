import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateComponent {
  loginFG;
  token: string = '';
  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginFG = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  login() {
    const credentials = {
      email: this.loginFG.get('email').value,
      password: this.loginFG.get('password').value,
    };
    this.authService.auth(credentials).subscribe((value) => {
      console.log(value);
      this.token = value.token;
    });
  }
}
