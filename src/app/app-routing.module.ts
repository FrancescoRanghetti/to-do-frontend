import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {WelcomePageComponent} from "./page/welcome-page/welcome-page.component";
import {AuthenticationPageComponent} from "./page/authentication-page/authentication-page.component";
import {AppMainPageComponent} from "./page/app-main-page/app-main-page.component";

const routes: Routes = [
  {path: 'welcome', component: WelcomePageComponent},
  {path: 'authentication', component: AuthenticationPageComponent},
  {path: '', component: AppMainPageComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
