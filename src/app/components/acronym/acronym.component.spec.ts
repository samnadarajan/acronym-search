import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {AcronymComponent} from "./acronym.component";
import {SearchComponent} from "../search/search.component";
import {ResultComponent} from "../result/result.component";
import {MaterialModule} from "../../material/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AngularFirestoreModule, AngularFirestore} from "@angular/fire/firestore";
import {BehaviorSubject} from "rxjs";

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
                ResultComponent
            ],
            imports: [
                MaterialModule,
                FormsModule,
                ReactiveFormsModule,
                AngularFirestoreModule,
                BrowserAnimationsModule
            ],
            providers: [
                { provide: AngularFirestore, useValue: FirestoreStub },
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AcronymComponent);
        component = fixture.componentInstance;
        compiled = fixture.debugElement.nativeElement;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should have the correct title", async(() => {
        fixture.detectChanges();
        expect(compiled.querySelector("h4").textContent.trim()).toEqual("Welcome to " + component.title + "!");
    }));

    it("should have the search component", async(() => {
        expect(compiled.querySelector("app-search")).toBeTruthy();
    }));
});
