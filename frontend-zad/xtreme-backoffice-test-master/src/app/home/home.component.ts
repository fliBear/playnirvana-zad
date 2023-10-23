import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  languages: string[] = ["en", "hr"];

  languageForm: FormGroup = new FormGroup({
    language: new FormControl("en"),
  });

  constructor(private userService: UserService, private router: Router,
    private translate: TranslateService) {
      const language = localStorage.getItem("language");
        if(language) {
          this.languageForm.setValue({"language": language})
        }
     }

  ngOnInit(): void {
  }

  logout(): void {
    this.router.navigateByUrl("/login");
    this.userService.logout();
  }

  languageChange(): void {
    this.translate.use(this.languageForm.value.language ?? "en");
    localStorage.setItem('language', this.languageForm.value.language ?? "en");
  }
}
