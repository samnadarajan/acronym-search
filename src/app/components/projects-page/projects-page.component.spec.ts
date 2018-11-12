import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ProjectsPageComponent } from "./projects-page.component";
import {MaterialModule} from "@app/material/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {StoreModule} from "@ngrx/store";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BehaviorSubject, of} from "rxjs";
import {AngularFirestore} from "@angular/fire/firestore";
import * as ProjectActions from "../../store/actions/project.actions";

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

    const projectList = [{name: "Frodo"}, {name: "Gandalf"}, {name: "Gimli"}, {name: "Samwise"}];

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ProjectsPageComponent ],
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

    it("should delete a project", () => {

    });

    it("should make a project the default", async(() => {
        spyOn(component, "makeDefault").and.callThrough();
        spyOn(component.store, "dispatch");
        spyOn(component.snackBar, "open");
        const cards = compiled.querySelectorAll("mat-card");
        const projectToSelect = projectList[1];

        if (cards.length > 0) {
            cards[1].click();

            fixture.detectChanges();

            expect(component.makeDefault).toHaveBeenCalledWith(projectToSelect.name);
            expect(component.currentDefaultProject.projectName).toEqual(projectToSelect.name);
            expect(component.store.dispatch).toHaveBeenCalledWith(new ProjectActions.SetDefaultProject(component.currentDefaultProject));
            expect(component.snackBar.open).toHaveBeenCalled();
        }
    }));
});
