import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { GetApiService } from '../../get-api.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AccountCreatedComponent} from '../../snack-bar/account-created/account-created.component';

@Component({
  selector: 'app-create-account-dialog',
  templateUrl: './create-account-dialog.component.html',
  styleUrls: ['./create-account-dialog.component.css']
})
export class CreateAccountDialogComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
  testAccountCreated = false;
  FirstName = new FormControl('', [Validators.required]);
  LastName = new FormControl('', [Validators.required]);
  Password = new FormControl('', [Validators.required]);
  ConfirmedPassword = new FormControl('', [Validators.required]);
  NombreElements;
  EmailDoubleTest = false;
  SamePasswordTest = false;
  getErrorMessage(form: FormControl): string {
    if (form.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  constructor(private api: GetApiService, public dialog: MatDialog, private snackBar: MatSnackBar) { }

  openSnackBar(): void {
    this.snackBar.openFromComponent(AccountCreatedComponent, {
      duration: 3000,
    });
  }

  FieldFilled(): boolean{
    return this.email.value !== '' && this.FirstName.value !== '' && this.LastName.value !== '' && this.Password.value !== '' &&
      this.ConfirmedPassword.value !== '';
  }

  delay(ms: number): Promise<any> {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  CreateAccount(): void{
    this.email.markAsTouched();
    this.FirstName.markAsTouched();
    this.LastName.markAsTouched();
    this.Password.markAsTouched();
    this.ConfirmedPassword.markAsTouched();
    if (this.ConfirmedPassword.value !== this.Password.value){
      this.SamePasswordTest = true;
    }
    if (this.FieldFilled() && (this.ConfirmedPassword.value === this.Password.value)){
      this.api.GET_USERS().subscribe((data) => {
        this.NombreElements = data['hydra:totalItems'] - 1;
        for (let i = 0; i <= this.NombreElements; i++){
          if (data['hydra:member'][i].email === this.email.value){
            this.EmailDoubleTest = true;
          }
        }
        if (!this.EmailDoubleTest){
          this.api.POST_API_USER(this.email.value, this.FirstName.value, this.LastName.value, this.Password.value);
          this.openSnackBar();
          (async () => {
            await this.delay(500);
            window.location.reload();
          })();
        }
      });
    }
  }

  ngOnInit(): void {
  }

}
