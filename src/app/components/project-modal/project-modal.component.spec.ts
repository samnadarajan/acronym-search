import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ProjectModalComponent } from "./project-modal.component";
import {MaterialModule} from "../../material/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material";
import {StoreModule} from "@ngrx/store";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe("ProjectModalComponent", () => {
    let component: ProjectModalComponent;
    let fixture: ComponentFixture<ProjectModalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ProjectModalComponent ],
            imports: [
                MaterialModule,
                FormsModule,
                ReactiveFormsModule,
                BrowserAnimationsModule,
                StoreModule.forRoot({})
            ],
            providers: [
                {provide: MAT_DIALOG_DATA, useValue: {}}
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProjectModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
