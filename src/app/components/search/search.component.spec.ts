import {async, ComponentFixture, fakeAsync, TestBed, tick} from "@angular/core/testing";

import { SearchComponent } from "./search.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MaterialModule} from "../../material/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BehaviorSubject, of} from "rxjs";
import {SearchService} from "../../services/search/search.service";
import {AngularFirestoreModule, AngularFirestore} from "@angular/fire/firestore";

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
    let compiled;

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
                SearchService
            ]
        })
        .compileComponents();
        }));

    beforeEach(() => {
        f = TestBed.createComponent(SearchComponent);
        c = f.componentInstance;
        compiled = f.debugElement.nativeElement;
        f.detectChanges();
    });

    it("should create component", () => {
        expect(c).toBeTruthy();
    });

    it("should have initial values", () => {
        expect(c.code.value).toEqual("");
    });

    it("should execute a search when 2+ letters are provided", () => {
        spyOn(c.searchString, "emit");
        c.beginSearch("test");
        expect(c.searchString.emit).toHaveBeenCalled();

        c.beginSearch("te");
        expect(c.searchString.emit).toHaveBeenCalled();
    });

    it("should execute not a search when less than 2 letters are provided", () => {
        spyOn(c.searchString, "emit");
        c.beginSearch("s");
        expect(c.searchString.emit).not.toHaveBeenCalled();
    });

    it("should have a place to enter an acronym", () => {
        expect(compiled.querySelector("mat-form-field input")).toBeTruthy();
    });
});
