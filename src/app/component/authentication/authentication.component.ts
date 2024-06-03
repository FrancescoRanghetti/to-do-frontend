import {Component} from '@angular/core';
import {UserService} from "../../Service/User.service";
import * as CryptoJS from 'crypto-js';
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {TagService} from "../../Service/Tag.service";
import {ListService} from "../../Service/List.Service";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent {
  protected nameSign: string = '';
  protected lastNameSign: string = '';
  protected usernameSign: string = '';
  protected passwordSign: string = '';
  protected usernameLogin: string = '';
  protected passwordLogin: string = '';
  protected errorUser: string = '';

  constructor(private userService: UserService, private router: Router, private tagService: TagService, private listService: ListService) {
  }

  registerUser() {
    if (this.nameSign !== '' && this.lastNameSign !== '' && this.usernameSign !== '' && this.passwordSign !== '') {
      this.userService.getUser(this.usernameSign).subscribe(
        (user) => {
          console.log('User exists:', user);
          this.errorUser = 'User already exist'
        },
        (error) => {
          if (error.status === 404) {
            console.log('User does not exist, creating new user');
            this.userService.addUser(this.nameSign, this.lastNameSign, this.usernameSign, this.encryptPassword(this.passwordSign)).subscribe(
              (response) => {
                this.userService.getUser(this.usernameSign).subscribe(
                  (user) => {
                    localStorage.setItem("currentIdUser", user.id)
                    this.tagService.createDefaultTag(user.id).pipe().subscribe()
                    this.listService.createDefaultList(user.id).pipe().subscribe()
                  })
                console.log('User created successfully:', response);
                this.nameSign = ''
                this.lastNameSign = ''
                this.usernameSign = ''
                this.passwordSign = ''
              },
              (error) => {
                console.error('Error creating user:', error);
              }
            );
          } else {
            console.error('Error checking user:', error);
          }
        }
      );
    }
  }

  loginUser() {
    if (this.usernameLogin != '' && this.passwordLogin != '') {
      this.userService.loginUser(this.usernameLogin, this.encryptPassword(this.passwordLogin)).pipe().subscribe((loginSuccess: any) => {
        if (loginSuccess) {
          this.userService.getUser(this.usernameLogin).subscribe(
            (user) => {
              localStorage.setItem("currentIdUser", user.id)
            })
          this.usernameLogin = ''
          this.passwordLogin = ''
          localStorage.setItem("login", "done")
          this.router.navigate(['/'])
        }
      })
      this.errorUser = 'Credential incorrect'
    }
  }

  encryptPassword(password: string): string {
    return CryptoJS.SHA256(password).toString();
  }
}
