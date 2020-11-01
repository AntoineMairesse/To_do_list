import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { TodolistComponent } from './todolist/todolist.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { LoginDialogComponent } from './navbar/login-dialog/login-dialog.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { CreateAccountDialogComponent } from './navbar/create-account-dialog/create-account-dialog.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AccountCreatedComponent } from './snack-bar/account-created/account-created.component';
import { DisconnectDialogComponent } from './disconnect-dialog/disconnect-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    TodolistComponent,
    NavbarComponent,
    DeleteDialogComponent,
    LoginDialogComponent,
    CreateAccountDialogComponent,
    AccountCreatedComponent,
    DisconnectDialogComponent,
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        DragDropModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatProgressBarModule,
        FormsModule,
        HttpClientModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatDialogModule,
        ReactiveFormsModule,
        AppRoutingModule,
        MatSnackBarModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
