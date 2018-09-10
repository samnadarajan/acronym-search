import { TestBed, inject } from "@angular/core/testing";

import { SearchService } from "./search.service";
import {BehaviorSubject} from "rxjs";
import {AngularFirestore} from "@angular/fire/firestore";

const FirestoreStub = {
    collection: (name: string) => ({
        doc: (_id: string) => ({
            valueChanges: () => new BehaviorSubject({ foo: "bar" }),
            set: (_d: any) => new Promise((resolve, _reject) => resolve()),
        }),
    }),
};

describe("SearchService", () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [SearchService, { provide: AngularFirestore, useValue: FirestoreStub }]
        });
    });

    it("should be created", inject([SearchService], (service: SearchService) => {
        expect(service).toBeTruthy();
        expect(service.searched).toEqual(false);
    }));

});
