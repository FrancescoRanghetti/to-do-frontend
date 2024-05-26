import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainAppComponent } from './component/main-app/main-app.component';
import {RouterOutlet} from "@angular/router";
import { AppRoutingModule } from './app-routing.module';
import { WelcomeComponent } from './component/welcome/welcome.component';
import { WelcomePageComponent } from './page/welcome-page/welcome-page.component';
import {NgOptimizedImage} from "@angular/common";
import { AuthenticationPageComponent } from './page/authentication-page/authentication-page.component';
import { AuthenticationComponent } from './component/authentication/authentication.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { AppMainPageComponent } from './page/app-main-page/app-main-page.component';
import { PopUpAddTaskComponent } from './component/pop-up-add-task/pop-up-add-task.component';
import { PopUpAddListComponent } from './component/pop-up-add-list/pop-up-add-list.component';
import { PopUpAddTagComponent } from './component/pop-up-add-tag/pop-up-add-tag.component';

@NgModule({
  declarations: [
    AppComponent,
    MainAppComponent,
    WelcomeComponent,
    WelcomePageComponent,
    AuthenticationPageComponent,
    AuthenticationComponent,
    AppMainPageComponent,
    PopUpAddTaskComponent,
    PopUpAddListComponent,
    PopUpAddTagComponent
  ],
  imports: [
    BrowserModule,
    RouterOutlet,
    AppRoutingModule,
    HttpClientModule,
    NgOptimizedImage,
    FormsModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
