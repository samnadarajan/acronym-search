import {TestBed, async} from "@angular/core/testing";
import {AppComponent} from "./app.component";
import {SearchComponent} from "./components/search/search.component";
import {MaterialModule} from "./material/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BehaviorSubject} from "rxjs";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ResultComponent} from "./components/result/result.component";
import {AngularFirestoreModule, AngularFirestore} from "@angular/fire/firestore";

const FirestoreStub = {
    collection: (name: string) => ({
        doc: (_id: string) => ({
            valueChanges: () => new BehaviorSubject({ foo: "bar" }),
            set: (_d: any) => new Promise((resolve, _reject) => resolve()),
        }),
    }),
};

describe("AppComponent", () => {
    let fixture, app, compiled;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
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
        }).compileComponents();

        fixture = TestBed.createComponent(AppComponent);
        app = fixture.debugElement.componentInstance;
        compiled = fixture.debugElement.nativeElement;

    }));
    it("should create the app", async(() => {
        expect(app).toBeTruthy();
    }));

    it("should have the correct title", async(() => {
        fixture.detectChanges();
        expect(compiled.querySelector("h4").textContent.trim()).toEqual("Welcome to " + app.title + "!");
    }));

    it("should have the search component", async(() => {
        expect(compiled.querySelector("app-search")).toBeTruthy();
    }));
});
