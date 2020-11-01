import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { CreateAccountDialogComponent } from '../create-account-dialog/create-account-dialog.component';
import { GetApiService } from '../../get-api.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  $data;
  PasswordError = 0;
  EmailError = 0;
  getErrorMessage(): string {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  constructor(private router: Router, public dialog: MatDialog, private api: GetApiService, private auth: AuthService) { }

  Login(): void{
    this.email.markAsTouched();
    this.password.markAsTouched();
    if (!this.email.invalid){
      this.$data = this.api.POST_LOGIN(this.password.value, this.email.value);
      this.$data.subscribe(data => {
        if (data === 'BadPassword'){
          this.PasswordError = 0;
          (async () => {
            await this.delay(125);
            this.PasswordError = 1;
          })();
        }
        else if (data === 'UserNotFound'){
          this.EmailError = 0;
          (async () => {
            await this.delay(125);
            this.EmailError = 1;
          })();
        }
        else if (data !== null){
          this.auth.setLoggedIn(data.firstName, this.email.value);
        }
      });
    }
  }


  CreateAccountDialog(): void {
    const dialogRef = this.dialog.open(CreateAccountDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {

      }
    });
  }

  delay(ms: number): Promise<any> {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  ngOnInit(): void {
  }

}
