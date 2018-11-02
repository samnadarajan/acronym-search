import {TestBed, async} from "@angular/core/testing";
import {AppComponent} from "./app.component";
import {CodeSearchInputComponent} from "./components/search/code-search-input.component";
import {MaterialModule} from "./material/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BehaviorSubject, of} from "rxjs";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ResultComponent} from "./components/result/result.component";
import {AngularFirestoreModule, AngularFirestore} from "@angular/fire/firestore";
import {RouterTestingModule} from "@angular/router/testing";
import {AngularFireAuth} from "@angular/fire/auth";
import {Store, StoreModule} from "@ngrx/store";
import {AuthService} from "@app/modules/auth/services/auth/auth.service";

const FirestoreStub = {
    collection: (name: string) => ({
        doc: (_id: string) => ({
            valueChanges: () => new BehaviorSubject({ foo: "bar" }),
            set: (_d: any) => new Promise((resolve, _reject) => resolve()),
        }),
    }),
};

const FireAuthStub = {
    auth: {
        onAuthStateChanged: () => {}
    },
    authState: of({email: "test@test.com", password: "password"})
};

describe("AppComponent", () => {
    let fixture, app, compiled;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
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
                AuthService,
                Store
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(AppComponent);
        app = fixture.debugElement.componentInstance;
        compiled = fixture.debugElement.nativeElement;

    }));
    it("should create the app", async(() => {
        expect(app).toBeTruthy();
    }));
});
