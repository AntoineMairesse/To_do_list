import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {NgForm} from '@angular/forms';
import { GetApiService } from '../get-api.service';
import { ToDoBlock } from '../../variables';
import {ChangeDetectorRef, OnDestroy} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {MatDialog} from '@angular/material/dialog';
import {DeleteDialogComponent} from '../delete-dialog/delete-dialog.component';
import { AuthService } from '../auth.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  // tslint:disable-next-line:variable-name
  private readonly _mobileQueryListener: () => void;
  rows: Array<Observable<object>> = [];
  TodoTextBoxValue = '';
  valueSlider = 0;
  todo: Array<ToDoBlock> = [];
  doing: Array<ToDoBlock> = [];
  done: Array<ToDoBlock> = [];
  LoggedIn = this.auth.isLoggedIn();

  // tslint:disable-next-line:max-line-length
  constructor(private api: GetApiService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, public dialog: MatDialog, public auth: AuthService) {
    this.LoggedIn = this.auth.isLoggedIn();
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.api.GET_USERS_BLOCK().subscribe((data: any) => {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < data.length; i++){
        if ((data[i].status) === 'ToDo') {
          const test: ToDoBlock = {id: data[i].id , content : (data[i].content) };
          this.todo.push(test);
        }
        if (data[i].status === 'Doing') {
          const test: ToDoBlock = {id: data[i].id , content : (data[i].content) };
          this.doing.push(test);
        }
        if (data[i].status === 'Done') {
          const test: ToDoBlock = {id: data[i].id , content : (data[i].content) };
          this.done.push(test);
        }
      }
    });
  }

  drop(event: CdkDragDrop<Array<ToDoBlock>, any>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      if (event.container.id === 'cdk-drop-list-1') {
        this.api.PUT_API_BLOCK(event.container.data[0].id, 'Doing');
      }
      if (event.container.id === 'cdk-drop-list-2') {
        this.api.PUT_API_BLOCK(event.container.data[0].id, 'Done');
      }
      if (event.container.id === 'cdk-drop-list-0') {
        this.api.PUT_API_BLOCK(event.container.data[0].id, 'ToDo');
      }
      this.updateBar();
    }
  }

  add(f: NgForm): void {
    console.log(localStorage.getItem('UserID'));
    if (f.value.input !== ''){
      this.api.POST_API_BLOCK(this.TodoTextBoxValue, 'ToDo', (this.todo.length) + 1);
      this.api.GET_USERS_BLOCK().subscribe((data: any) => {
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < data.length; i++){
          if ((data[i].content) === this.TodoTextBoxValue) {
            const test: ToDoBlock = {id: data[i].id , content: f.value.input };
            this.todo.push(test);
            this.TodoTextBoxValue = '';
          }
        }
      });
      this.updateBar();
    }
  }

  updateBar(): void {
    const sumTask = this.done.length + this.todo.length + this.doing.length;
    this.valueSlider = ((this.done.length) / sumTask) * 100;
  }

  delete(test: Array<ToDoBlock>, item: any): void {
    const index = test.indexOf(item, 0);
    console.log(index);
    if (index > -1) {
      const dialogRef = this.dialog.open(DeleteDialogComponent);
      dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          this.api.DELETE_API_BLOCK(test[index].id);
          test.splice(index, 1);
        }
      });
    }
    this.updateBar();
  }

  delay(ms: number): Promise<any> {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  ngOnInit(): void {
    (async () => {
      await this.delay(600);
      this.updateBar();
    })();
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
