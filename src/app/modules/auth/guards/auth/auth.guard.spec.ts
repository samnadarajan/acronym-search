import {TestBed, inject} from "@angular/core/testing";

import {AuthGuard} from "./auth.guard";
import {RouterTestingModule} from "@angular/router/testing";
import {AuthService} from "../../services/auth/auth.service";
import {BehaviorSubject, of} from "rxjs";
import {AngularFireAuth} from "@angular/fire/auth";
import {AngularFirestore} from "@angular/fire/firestore";
import {Store, StoreModule} from "@ngrx/store";

const FireAuthStub = {
    auth: (name: string) => ({
        signInWithPopup: (provider: any) => new Promise((resolve, _reject) => resolve()),
        signOut: () => new Promise((resolve, _reject) => resolve())
    }),
    authState: of({email: "test@test.com", password: "password"})
};

const FirestoreStub = {
    collection: (name: string) => ({
        doc: (_id: string) => ({
            valueChanges: () => new BehaviorSubject({ foo: "bar" }),
            set: (_d: any) => new Promise((resolve, _reject) => resolve()),
        }),
    }),
};

describe("AuthGuard", () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                StoreModule.forRoot({})
            ],
            providers: [
                AuthGuard,
                AuthService,
                { provide: AngularFireAuth, useValue: FireAuthStub },
                { provide: AngularFirestore, useValue: FirestoreStub },
                Store
            ]
        });
    });

    it("should exist", inject([AuthGuard], (guard: AuthGuard) => {
        expect(guard).toBeTruthy();
    }));
});
