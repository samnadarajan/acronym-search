import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AddProjectDialogComponent } from "./add-project-dialog.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "@app/material/material.module";
import {StoreModule} from "@ngrx/store";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import * as ProjectActions from "@app/store/actions/project.actions";

describe("AddProjectDialogComponent", () => {
    let component: AddProjectDialogComponent;
    let fixture: ComponentFixture<AddProjectDialogComponent>;
    let compiled;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ AddProjectDialogComponent ],
            imports: [
                FormsModule,
                ReactiveFormsModule,
                MaterialModule,
                BrowserAnimationsModule,
                StoreModule.forRoot({})
            ],
            providers: [
                {provide: MAT_DIALOG_DATA, useValue: [{name: "FOX"}, {name: "Steve"}, {name: "Flax"}]},
                {provide: MatDialogRef, useValue: {close: jest.fn()}},
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddProjectDialogComponent);
        component = fixture.componentInstance;
        compiled = fixture.debugElement.nativeElement;
        spyOn(component.store, "dispatch");
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should not add a project that exists", () => {
        component.validate("Steve");

        fixture.detectChanges();

        expect(component.isValid).toEqual(false);
        expect(component.error).not.toBeNull();
    });

    it("should add a project because it doesn't exist in the project list", () => {
        spyOn(component, "addProject").and.callThrough();
        const newProject = "Bruce";
        component.validate(newProject);
        fixture.detectChanges();

        expect(component.isValid).toEqual(true);
        expect(component.error).toBeNull();
        expect(component.addProject).toHaveBeenCalledWith(newProject);
        expect(component.dialogRef.close).toHaveBeenCalled();
    });

    it("should dispatch an action to add the new project", () => {
        const newProject = "FixIt";
        component.addProject(newProject);
        fixture.detectChanges();

        const actions = new ProjectActions.AddProject({name: newProject});
        expect(component.store.dispatch).toHaveBeenCalledWith(actions);
    });

    it("should validate the project upon submit", () => {
        spyOn(component, "validate");
        const projectValue = "Bills";
        component.addProjectForm.setValue(projectValue);
        const addProjectButton = compiled.querySelector("button.add-project-button");
        addProjectButton.click();

        fixture.detectChanges();

        expect(component.validate).toHaveBeenCalledWith(projectValue);
    });
});
