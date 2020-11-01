import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisconnectDialogComponent } from './disconnect-dialog.component';

describe('DisconnectDialogComponent', () => {
  let component: DisconnectDialogComponent;
  let fixture: ComponentFixture<DisconnectDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisconnectDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisconnectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
