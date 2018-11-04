import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {AcronymPageComponent} from "./acronym-page.component";
import {CodeSearchInputComponent} from "../search/code-search-input.component";
import {ResultComponent} from "../result/result.component";
import {MaterialModule} from "@app/material/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AngularFirestoreModule, AngularFirestore} from "@angular/fire/firestore";
import {BehaviorSubject, of} from "rxjs";
import {ProjectSelectComponent} from "../project-select/project-select.component";
import {Store, StoreModule} from "@ngrx/store";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import * as ProjectActions from "../../store/actions/project.actions";
import * as AcronymActions from "../../store/actions/acronym.actions";
import {AngularFireAuth} from "@angular/fire/auth";
import {RouterTestingModule} from "@angular/router/testing";
import {promise} from "selenium-webdriver";
import Promise = promise.Promise;

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

const FireAuthStub = {
    auth: {
        onAuthStateChanged: () => {}
    },
    authState: of({email: "test@test.com", password: "password"})
};

describe("AcronymPageComponent", () => {
    let component: AcronymPageComponent;
    let fixture: ComponentFixture<AcronymPageComponent>;
    let compiled;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AcronymPageComponent,
                CodeSearchInputComponent,
                ResultComponent,
                ProjectSelectComponent
            ],
            imports: [
                MaterialModule,
                FormsModule,
                ReactiveFormsModule,
                AngularFirestoreModule,
                BrowserAnimationsModule,
                RouterTestingModule,
                StoreModule.forRoot({})
            ],
            providers: [
                { provide: AngularFirestore, useValue: FirestoreStub },
                { provide: AngularFireAuth, useValue: FireAuthStub },
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AcronymPageComponent);
        component = fixture.componentInstance;
        compiled = fixture.debugElement.nativeElement;
        // spyOn(component.store, "pipe");
        spyOn(component.store, "dispatch").and.callThrough();
        spyOn(component._acronym$, "unsubscribe");
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should have an initial acronymResultState in case the observable returns nothing", () => {
        const initialState = {code: "", project: ""};
        expect(component.acronymResultState).toEqual(initialState);
    });

    it("should have a component for selecting projects", () => {
        expect(compiled.querySelector("app-project-select")).toBeTruthy();
    });

    it("should have the search and result component", async(() => {
        component.projectList$ = of([]);
        component.acronymResult$ = of({code: "", id: "2345efdr3"});
        component.user$ = of({uid: "23423f", email: "test@test.com"});
        component.selectedProject$ = of({name: "TEM"});
        fixture.detectChanges();
        expect(compiled.querySelector("app-code-search-input")).toBeTruthy();
        expect(compiled.querySelector("app-result")).toBeTruthy();
    }));

    it("should fetch a list of projects initially", () => {
        component.ngOnInit();
        expect(component.store.dispatch).toHaveBeenCalledWith(new ProjectActions.LoadProjects([]));
    });

    it("should begin a search", () => {
        const acronym = {code: "TEST"};
        const proj = {name: "SAM", id: "234re23"};
        component.beginSearch(acronym.code, proj);

        expect(component.store.dispatch).toHaveBeenCalledWith(new AcronymActions.SearchAcronym({code: acronym.code, project: proj.name}));
    });

    it("should not do a search again on the same code", () => {
        component.acronymResultState = {code: "TEST", project: "SAM"};
        const acronym = {code: "TEST"};
        const proj = {name: "SAM", id: "234re23"};
        component.beginSearch(acronym.code, proj);

        expect(component.store.dispatch).not.toHaveBeenCalledWith();
    });

    it("should save an acronym", () => {
        const acronym = {code: "TEST"};
        const proj = {name: "SAM", id: "234re23"};
        component.save(acronym, proj);

        expect(component.store.dispatch).toHaveBeenCalledWith(new AcronymActions.SaveAcronym(acronym));
    });

    it("should destroy the component observable OnDestroy", () => {
        component.ngOnDestroy();
        expect(component._acronym$.unsubscribe).toHaveBeenCalled();
    });

    it("should have a side navigation", () => {

    });

    it("should have a link for projects, reporting issues, and logging out", () => {

    });

    it("should log the user out when logging out", async(() => {
        component.projectList$ = of([]);
        component.acronymResult$ = of({code: "", id: "2345efdr3"});
        spyOn(component.authService, "signOut");
        component.user$ = of({uid: "23423f", email: "test@test.com"});

        fixture.detectChanges();

        const logoutButton = compiled.querySelector("button.logout");
        logoutButton.click();

        fixture.detectChanges();

        expect(component.authService.signOut).toHaveBeenCalled();
    }));
});
