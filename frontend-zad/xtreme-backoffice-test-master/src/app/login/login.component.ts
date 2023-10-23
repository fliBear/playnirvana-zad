import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  private loginObserver = {
    next: (user: User) => {
      this.router.navigateByUrl("/dashboard")
    },
    error: (error: Error)  => {
      this.loginForm.setValue({"username": "", "password": ""})
    }
  }

  login(): void {
    this.userService.login(this.loginForm.value.username ?? "", this.loginForm.value.password ?? "")
    .subscribe(this.loginObserver);
  }
 
}
