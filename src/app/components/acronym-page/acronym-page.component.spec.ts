import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {AcronymPageComponent} from "./acronym-page.component";
import {CodeSearchInputComponent} from "../search/code-search-input.component";
import {ResultComponent} from "../result/result.component";
import {MaterialModule} from "@app/material/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AngularFirestoreModule, AngularFirestore} from "@angular/fire/firestore";
import {BehaviorSubject, of} from "rxjs";
import {StoreModule} from "@ngrx/store";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import * as ProjectActions from "../../store/actions/project.actions";
import * as AcronymActions from "../../store/actions/acronym.actions";
import {AngularFireAuth} from "@angular/fire/auth";
import {promise} from "selenium-webdriver";
import Promise = promise.Promise;
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {RouterTestingModule} from "@angular/router/testing";
import {AuthService} from "@app/modules/auth/services/auth/auth.service";

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

const AuthServiceStub = {
    logOut: jest.fn()
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
                ResultComponent
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
                { provide: AuthService, useValue: AuthServiceStub },
            ],
            schemas: [
                NO_ERRORS_SCHEMA
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AcronymPageComponent);
        component = fixture.componentInstance;
        compiled = fixture.debugElement.nativeElement;
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

    it("should have a component for searching on projects", () => {
        expect(compiled.querySelector("app-search")).toBeTruthy();
    });

    it("should have the search and result component", async(() => {
        component.projectList$ = of([]);
        component.acronymResult$ = of({code: "", id: "2345efdr3"});
        component.selectedProject$ = of("TEM");
        fixture.detectChanges();
        expect(compiled.querySelector("app-result")).toBeTruthy();
    }));

    it("should fetch a list of projects initially", () => {
        component.ngOnInit();
        expect(component.store.dispatch).toHaveBeenCalledWith(new ProjectActions.LoadProjects([]));
    });

    it("should begin a search", () => {
        const acronym = {code: "TEST", project: "FLSS"};
        component.search(acronym);

        expect(component.store.dispatch).toHaveBeenCalledWith(new AcronymActions.SearchAcronym(acronym));
    });

    it("should not do a search again on the same code", () => {
        component.acronymResultState = {code: "TEST", project: "SAM"};
        const acronym = {code: "TEST", project: "SAM"};
        component.search(acronym);

        expect(component.store.dispatch).not.toHaveBeenCalledWith();
    });

    it("should save an acronym", () => {
        const acronym = {code: "TEST"};
        const proj = {name: "SAM", id: "234re23"};
        component.save(acronym, proj.name);

        expect(component.store.dispatch).toHaveBeenCalledWith(new AcronymActions.SaveAcronym(acronym));
    });

    it("should destroy the component observable OnDestroy", () => {
        component.ngOnDestroy();
        expect(component._acronym$.unsubscribe).toHaveBeenCalled();
    });
});
