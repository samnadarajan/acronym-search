import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {LoginComponent} from "./login.component";
import {MaterialModule} from "@app/material/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AngularFirestoreModule, AngularFirestore} from "@angular/fire/firestore";
import {AuthModule} from "@app/modules/auth/auth.module";
import {BehaviorSubject, of} from "rxjs";
import {AuthService} from "@app/modules/auth/services/auth/auth.service";
import {AngularFireAuth} from "@angular/fire/auth";
import {RouterTestingModule} from "@angular/router/testing";
import {SearchService} from "@app/services/search/search.service";
import {FirebaseUIModule} from "firebaseui-angular";
import * as firebase from "firebase/app";
import * as firebaseui from "firebaseui";

const FirestoreStub = {
    collection: (name: string) => ({
        doc: (_id: string) => ({
            valueChanges: () => new BehaviorSubject({ foo: "bar" }),
            set: (_d: any) => new Promise((resolve, _reject) => resolve()),
        }),
    }),
};

const FireAuthStub = {
    auth: (name: string) => ({
        signInWithPopup: (provider: any) => new Promise((resolve, _reject) => resolve()),
        signOut: () => new Promise((resolve, _reject) => resolve())
    }),
    authState: of({email: "test@test.com", password: "password"})
};

const firebaseUiAuthConfig: firebaseui.auth.Config = {
    signInFlow: "popup",
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM
};

describe("LoginComponent", () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LoginComponent],
            imports: [
                MaterialModule,
                FormsModule,
                ReactiveFormsModule,
                AngularFirestoreModule,
                BrowserAnimationsModule,
                AuthModule,
                RouterTestingModule,
                FirebaseUIModule.forRoot(firebaseUiAuthConfig),
            ],
            providers: [
                { provide: AngularFirestore, useValue: FirestoreStub },
                { provide: AngularFireAuth, useValue: FireAuthStub },
                AuthService,
                SearchService
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
