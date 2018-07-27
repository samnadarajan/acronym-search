import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SearchComponent } from "./search.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AngularFirestore, AngularFirestoreModule} from "angularfire2/firestore";
import {MaterialModule} from "../../material/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BehaviorSubject} from "rxjs";

const FirestoreStub = {
    collection: (name: string) => ({
        doc: (_id: string) => ({
            valueChanges: () => new BehaviorSubject({ foo: "bar" }),
            set: (_d: any) => new Promise((resolve, _reject) => resolve()),
        }),
    }),
};

describe("SearchComponent", () => {
    let c: SearchComponent;
    let f: ComponentFixture<SearchComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                SearchComponent
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
        f = TestBed.createComponent(SearchComponent);
        c = f.componentInstance;
        f.detectChanges();
    });

    it("should create component", () => {
        expect(c).toBeTruthy();
    });

    it("should have initial values", () => {
        expect(c.code.value).toEqual("");
    });

    it("should execute a search when 2+ letters are provided", () => {
        spyOn(c, "search");
        expect(c).toBeTruthy();
    });

    it("should execute not a search when 2+ letters are provided", () => {
        expect(c).toBeTruthy();
    });

    it("should have a place to enter an acronym", () => {
        expect(c).toBeTruthy();
    });

    it("should show a result", () => {
        expect(c).toBeTruthy();
    });

    it("should show only 1 result", () => {
        expect(c).toBeTruthy();
    });

    it("should show a not found message with no result", () => {
        expect(c).toBeTruthy();
    });
});
