import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {AcronymComponent} from "./acronym.component";
import {SearchComponent} from "../search/search.component";
import {ResultComponent} from "../result/result.component";
import {MaterialModule} from "../../material/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AngularFirestoreModule, AngularFirestore} from "@angular/fire/firestore";
import {BehaviorSubject, of} from "rxjs";
import {ProjectSelectComponent} from "../project-select/project-select.component";
import {NgSelectModule} from "../../../../node_modules/@ng-select/ng-select";
import {Store, StoreModule} from "@ngrx/store";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NO_ERRORS_SCHEMA} from "@angular/core";

const FirestoreStub = {
    collection: (name: string) => ({
        doc: (_id: string) => ({
            valueChanges: () => new BehaviorSubject({ foo: "bar" }),
            set: (_d: any) => new Promise((resolve, _reject) => resolve()),
        }),
    }),
};

describe("AcronymComponent", () => {
    let component: AcronymComponent;
    let fixture: ComponentFixture<AcronymComponent>;
    let compiled;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AcronymComponent,
                SearchComponent,
                ResultComponent,
                ProjectSelectComponent
            ],
            imports: [
                MaterialModule,
                FormsModule,
                ReactiveFormsModule,
                AngularFirestoreModule,
                BrowserAnimationsModule,
                NgSelectModule,
                StoreModule.forRoot({})
            ],
            providers: [
                {provide: AngularFirestore, useValue: FirestoreStub },
                Store
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AcronymComponent);
        component = fixture.componentInstance;
        compiled = fixture.debugElement.nativeElement;
        spyOn(component.store, "pipe").and.callThrough();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should have the search component", async(() => {
        component.projects = of({list: [], selected: {name: "TED", id: "234524dfer32"}});
        component.acronymResult = of({code: "", id: "2345efdr3"});
        fixture.detectChanges();
        expect(compiled.querySelector("app-search")).toBeTruthy();
    }));
});
