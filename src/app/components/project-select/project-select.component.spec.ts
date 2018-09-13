import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ProjectSelectComponent } from "./project-select.component";
import {BehaviorSubject} from "rxjs";
import {MaterialModule} from "../../material/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SearchService} from "../../services/search/search.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgSelectModule} from "../../../../node_modules/@ng-select/ng-select";
import {AngularFirestoreModule, AngularFirestore} from "../../../../node_modules/@angular/fire/firestore";

const FirestoreStub = {
    collection: (name: string) => ({
        doc: (_id: string) => ({
            valueChanges: () => new BehaviorSubject({ foo: "bar" }),
            set: (_d: any) => new Promise((resolve, _reject) => resolve()),
        }),
    }),
};

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
            AngularFirestoreModule,
            BrowserAnimationsModule,
            NgSelectModule
        ],
        providers: [
            { provide: AngularFirestore, useValue: FirestoreStub },
            SearchService
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
