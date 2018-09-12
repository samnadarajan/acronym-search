import { TestBed, inject } from "@angular/core/testing";

import { AuthService } from "./auth.service";
import {BehaviorSubject, of} from "rxjs";
import {AngularFirestore} from "../../../../../../node_modules/@angular/fire/firestore";
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
};

describe("AuthService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
            RouterTestingModule
        ],
        providers: [
            AuthService,
            { provide: AngularFirestore, useValue: FirestoreStub },
            { provide: AngularFireAuth, useValue: FireAuthStub },
        ]
    });
  });

  it("should be created", inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
