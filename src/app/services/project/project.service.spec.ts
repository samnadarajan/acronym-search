import { TestBed } from "@angular/core/testing";

import {ProjectService} from "./project.service";
import {BehaviorSubject} from "rxjs";
import {SearchService} from "../search/search.service";
import {AngularFirestore} from "../../../../node_modules/@angular/fire/firestore";

const FirestoreStub = {
    collection: (name: string) => ({
        doc: (_id: string) => ({
            valueChanges: () => new BehaviorSubject({foo: "bar"}),
            set: (_d: any) => new Promise((resolve, _reject) => resolve()),
        }),
    }),
};

describe("ProjectService", () => {
    beforeEach(() => TestBed.configureTestingModule({
        providers: [SearchService, { provide: AngularFirestore, useValue: FirestoreStub }]
    }));

    it("should be created", () => {
        const service: ProjectService = TestBed.get(ProjectService);
        expect(service).toBeTruthy();
    });
});
