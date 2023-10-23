import { Injectable } from "@angular/core";
import { Grant, User } from "../models/user.model";
import { UserService } from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class LinkAuthService {
    isAuthorized(grant: Grant, userService: UserService): boolean {
        const user: User = userService.getCurrentUser();
        if (user) {
            if (user.grants.indexOf(grant) >= 0) {
                return true;
            }
        }
        return false;
    }
}