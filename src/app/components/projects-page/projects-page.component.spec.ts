import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ProjectsPageComponent } from "./projects-page.component";
import {MaterialModule} from "@app/material/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {StoreModule} from "@ngrx/store";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BehaviorSubject, of} from "rxjs";
import {AngularFirestore} from "@angular/fire/firestore";
import * as ProjectActions from "../../store/actions/project.actions";
import {DeleteProjectDialogComponent} from "@app/components/delete-project-dialog/delete-project-dialog.component";
import {BrowserDynamicTestingModule} from "@angular/platform-browser-dynamic/testing";
import {AddProjectDialogComponent} from "@app/components/add-project-dialog/add-project-dialog.component";

const FirestoreStub = {
    collection: (name: string) => ({
        doc: (_id: string) => ({
            valueChanges: () => new BehaviorSubject({ foo: "bar" }),
            set: (_d: any) => new Promise((resolve, _reject) => resolve()),
        }),
    }),
    doc: () => ({
        valueChanges: () => new BehaviorSubject({foo: "bar"})
    })
};

describe("ProjectsPageComponent", () => {
    let component: ProjectsPageComponent;
    let fixture: ComponentFixture<ProjectsPageComponent>;
    let compiled;

    const projectList = [{name: "Frodo", id: "45etr"}, {name: "Gandalf", id: "324ef32"}, {name: "Gimli", id: "098efd"}, {name: "Samwise"}];

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ProjectsPageComponent, AddProjectDialogComponent, DeleteProjectDialogComponent ],
            imports: [
                MaterialModule,
                FormsModule,
                ReactiveFormsModule,
                StoreModule.forRoot({}),
                BrowserAnimationsModule
            ],
            providers: [
                { provide: AngularFirestore, useValue: FirestoreStub },
            ]
        }).overrideModule(BrowserDynamicTestingModule, {
            set: {
                entryComponents: [AddProjectDialogComponent, DeleteProjectDialogComponent]
            }
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProjectsPageComponent);
        component = fixture.componentInstance;
        compiled = fixture.debugElement.nativeElement;

        component.projectList$ = of(projectList);
        component.currentDefaultProject = {id: "2tfr3wfrt", uid: "4ewr3ew234", projectName: "Frodo"};
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should show a list of projects", async(() => {
        expect(compiled.querySelectorAll("mat-card").length).toEqual(projectList.length);
    }));

    it("should highlight the default project", async(() => {
        expect(compiled.querySelectorAll("mat-card.selected-card").length).toEqual(1);
    }));

    it("should launch dialog to delete a project", async(() => {
        spyOn(component, "openDeleteDialog");
        spyOn(component.store, "dispatch");

        const cards = compiled.querySelectorAll("mat-card");
        const projectCard = cards[0];
        const deleteButton = projectCard.querySelector("button.delete");
        deleteButton.click();

        fixture.detectChanges();

        expect(component.openDeleteDialog).toHaveBeenCalled();
    }));

    it("should make a project the default", async(() => {
        spyOn(component, "makeDefault").and.callThrough();
        spyOn(component.store, "dispatch");
        spyOn(component.snackBar, "open");
        const cards = compiled.querySelectorAll("mat-card");
        const projectToSelect = projectList[1];

        if (cards.length > 0) {
            const defaultButton = cards[1].querySelector("button.default");
            defaultButton.click();

            fixture.detectChanges();

            expect(component.makeDefault).toHaveBeenCalledWith(projectToSelect.name);
            expect(component.currentDefaultProject.projectName).toEqual(projectToSelect.name);
            expect(component.store.dispatch).toHaveBeenCalledWith(new ProjectActions.SetDefaultProject(component.currentDefaultProject));
            expect(component.snackBar.open).toHaveBeenCalled();
        }
    }));

    it("should launch dialog to add a project", async(() => {
        spyOn(component, "openAddDialog");
        const addProjectButton = compiled.querySelector("button.add-project-button");
        addProjectButton.click();

        fixture.detectChanges();

        expect(component.openAddDialog).toHaveBeenCalled();
    }));
});
