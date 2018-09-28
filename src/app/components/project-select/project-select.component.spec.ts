import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ProjectSelectComponent } from "./project-select.component";
import {MaterialModule} from "../../material/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgSelectModule} from "../../../../node_modules/@ng-select/ng-select";

describe("ProjectSelectComponent", () => {
  let component: ProjectSelectComponent;
  let fixture: ComponentFixture<ProjectSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [
            ProjectSelectComponent
        ],
        imports: [
            MaterialModule,
            FormsModule,
            ReactiveFormsModule,
            NgSelectModule
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
