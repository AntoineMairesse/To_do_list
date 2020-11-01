import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {MatDialog} from '@angular/material/dialog';
import {DeleteDialogComponent} from '../delete-dialog/delete-dialog.component';
import {LoginDialogComponent} from './login-dialog/login-dialog.component';
import {CreateAccountDialogComponent} from './create-account-dialog/create-account-dialog.component';
import {AuthService} from '../auth.service';
import {DisconnectDialogComponent} from '../disconnect-dialog/disconnect-dialog.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnDestroy {
  LoggedIn = this.auth.isLoggedIn();
  mobileQuery: MediaQueryList;
  // tslint:disable-next-line:variable-name
  private _mobileQueryListener: () => void;
  Username = localStorage.getItem('Username');
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, public dialog: MatDialog, public auth: AuthService) {
    this.LoggedIn = this.auth.isLoggedIn();
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  login(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
      }
    });
  }

  disconnect(): void{
    const dialogRef = this.dialog.open(DisconnectDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.auth.setDisconnected();
      }
    });
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  CreateAccountDialog(): void {
    const dialogRef = this.dialog.open(CreateAccountDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
      }
    });
  }
}
