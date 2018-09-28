import { TestBed } from "@angular/core/testing";

import {ProjectService} from "./project.service";
import {BehaviorSubject} from "rxjs";
import {AngularFirestore} from "../../../../node_modules/@angular/fire/firestore";
import {Store, StoreModule} from "@ngrx/store";

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
        imports: [StoreModule.forRoot({})],
        providers: [{ provide: AngularFirestore, useValue: FirestoreStub }, Store]
    }));

    it("should be created", () => {
        const service: ProjectService = TestBed.get(ProjectService);
        expect(service).toBeTruthy();
    });
});
