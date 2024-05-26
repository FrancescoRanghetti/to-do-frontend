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

  constructor(private userService: UserService, private router: Router, private tagService: TagService, private listService: ListService) {
  }

  registerUser() {
    // console.log("entra")
    // if (this.nameSign != '' && this.lastNameSign != '' && this.usernameSign != '' && this.passwordSign != '') {
    //   console.log("get" + this.getUser(this.usernameSign))
    //   console.log(this.nameSign)
    //   console.log(this.lastNameSign)
    //   console.log(this.usernameSign)
    //   console.log(this.passwordSign)
    //   this.userService.addUser(this.nameSign, this.lastNameSign, this.usernameSign, this.encryptPassword(this.passwordSign)).pipe().subscribe()
    // }
    if (this.nameSign !== '' && this.lastNameSign !== '' && this.usernameSign !== '' && this.passwordSign !== '') {
      console.log("entra")
      this.userService.getUser(this.usernameSign).subscribe(
        (user) => {
          console.log('User exists:', user);
          // Gestisci caso utente già esistente
        },
        (error) => {
          if (error.status === 404) {
            console.log('User does not exist, creating new user');
            this.userService.addUser(this.nameSign, this.lastNameSign, this.usernameSign, this.encryptPassword(this.passwordSign)).subscribe(
              (response) => {
                this.userService.getUser(this.usernameSign).subscribe(
                  (user) => {
                    localStorage.setItem("currentIdUser", user.id)
                    console.log("currentIdUser", localStorage.getItem("currentIdUser"))
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

  getUser(username: string) {
    this.userService.getUser(username).pipe().subscribe();
  }

  loginUser() {
    if (this.usernameLogin != '' && this.passwordLogin != '') {
      this.userService.loginUser(this.usernameLogin, this.encryptPassword(this.passwordLogin)).pipe().subscribe()
      this.userService.getUser(this.usernameLogin).subscribe(
        (user) => {
          localStorage.setItem("currentIdUser", user.id)
          console.log("currentIdUser", localStorage.getItem("currentIdUser"))
        })
      this.usernameLogin = ''
      this.passwordLogin = ''
      this.router.navigate(['/'])
    }
  }

  encryptPassword(password: string): string {
    return CryptoJS.SHA256(password).toString();
  }
}
