import { NgModule } from '@angular/core';
import {Router, RouterModule, Routes} from '@angular/router';
import { AppComponent } from '../app.component';
import {TodolistComponent} from '../todolist/todolist.component';
import {LoginDialogComponent} from '../navbar/login-dialog/login-dialog.component';
import {CreateAccountDialogComponent} from '../navbar/create-account-dialog/create-account-dialog.component';

const routes: Routes = [
  {
    path: '',
    component: TodolistComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule {
  constructor(){

  }

}
