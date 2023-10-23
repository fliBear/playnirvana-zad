import { Component, OnInit } from '@angular/core';
import { LinkAuthService } from '../services/link-auth-service';
import { Grant } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-permission-check',
  templateUrl: './permission-check.component.html',
  styleUrls: ['./permission-check.component.scss']
})
export class PermissionCheckComponent {

  grant = Grant;

  constructor(private linkAuthService: LinkAuthService, private userService: UserService) { }

  isAuthorized(grant: Grant): boolean {
    return this.linkAuthService.isAuthorized(grant, this.userService);
  }

}
