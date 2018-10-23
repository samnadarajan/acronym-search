import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ProjectSelectComponent } from "./project-select.component";
import {MaterialModule} from "../../material/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSelect} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import * as ProjectActions from "@app/store/actions/project.actions";
import {StoreModule} from "@ngrx/store";

describe("ProjectSelectComponent", () => {
    let component: ProjectSelectComponent;
    let fixture: ComponentFixture<ProjectSelectComponent>;
    let compiled;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ProjectSelectComponent
            ],
            imports: [
                MaterialModule,
                FormsModule,
                ReactiveFormsModule,
                BrowserAnimationsModule,
                StoreModule.forRoot({})
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProjectSelectComponent);
        component = fixture.componentInstance;
        compiled = fixture.debugElement.nativeElement;
        fixture.detectChanges();
        spyOn(component.store, "dispatch");
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should dispatch a select project action when selecting a project", () => {
        const event = {source: {} as MatSelect, value: {name: "SAM", id: "234re23"}};
        component.onChange(event);
        const action = new ProjectActions.SelectProject(event.value);
        expect(component.store.dispatch).toHaveBeenCalledWith(action);
    });
});
