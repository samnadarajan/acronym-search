import {TestBed, inject} from "@angular/core/testing";

import {AuthService} from "./auth.service";
import {BehaviorSubject, of} from "rxjs";
import {AngularFirestore} from "@angular/fire/firestore";
import {AngularFireAuth} from "@angular/fire/auth";
import {RouterTestingModule} from "@angular/router/testing";
import {Store, StoreModule} from "@ngrx/store";
import {HttpClient} from "@angular/common/http";

const FirestoreStub = {
    collection: (name: string) => ({
        doc: (_id: string) => ({
            valueChanges: () => new BehaviorSubject({foo: "bar"}),
            set: (_d: any) => new Promise((resolve, _reject) => resolve()),
        }),
    }),
};

const FireAuthStub = {
    auth: {
        onAuthStateChanged: () => {
        }
    },
    authState: of({email: "test@test.com", password: "password"})
};

const HttpStub = {
    get: () => ({
        toPromise: () => ({
            then: () => {
            }
        })
    })
};

describe("AuthService", () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                StoreModule.forRoot({})
            ],
            providers: [
                AuthService,
                {provide: HttpClient, useValue: HttpStub},
                Store,
                {provide: AngularFirestore, useValue: FirestoreStub},
                {provide: AngularFireAuth, useValue: FireAuthStub},
            ]
        });
    });

    it("should be created", inject([AuthService], (service: AuthService) => {
        expect(service).toBeTruthy();
    }));
});
