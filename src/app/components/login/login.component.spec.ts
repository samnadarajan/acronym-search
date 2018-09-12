import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {LoginComponent} from "./login.component";
import {MaterialModule} from "../../material/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AngularFirestoreModule, AngularFirestore} from "@angular/fire/firestore";
import {AuthModule} from "../../modules/auth/auth.module";
import {BehaviorSubject, Observable, of} from "rxjs";
import {AuthService} from "../../modules/auth/services/auth/auth.service";
import {AngularFireAuth} from "@angular/fire/auth";
import {RouterTestingModule} from "@angular/router/testing";

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
}

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
                RouterTestingModule
            ],
            providers: [
                { provide: AngularFirestore, useValue: FirestoreStub },
                { provide: AngularFireAuth, useValue: FireAuthStub },
                AuthService
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
