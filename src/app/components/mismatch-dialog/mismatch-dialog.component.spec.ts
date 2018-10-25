import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MismatchDialogComponent } from './mismatch-dialog.component';

describe('MismatchDialogComponent', () => {
  let component: MismatchDialogComponent;
  let fixture: ComponentFixture<MismatchDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MismatchDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MismatchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
