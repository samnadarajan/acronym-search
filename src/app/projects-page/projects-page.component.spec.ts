import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ProjectsPageComponent } from "./projects-page.component";
import {MaterialModule} from "@app/material/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {StoreModule} from "@ngrx/store";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe("ProjectsPageComponent", () => {
  let component: ProjectsPageComponent;
    let fixture: ComponentFixture<ProjectsPageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ProjectsPageComponent ],
            imports: [
                MaterialModule,
                FormsModule,
                ReactiveFormsModule,
                StoreModule.forRoot({}),
                BrowserAnimationsModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProjectsPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
