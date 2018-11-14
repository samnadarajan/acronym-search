import { TestBed } from "@angular/core/testing";

import {ProjectService} from "./project.service";
import {AngularFirestore} from "@angular/fire/firestore";
import {Store, StoreModule} from "@ngrx/store";
import {config} from "@app/app.config";

const collectionStub = {
    valueChanges: jasmine.createSpy("valueChanges").and.returnValue({code: "SAM"}),
    snapshotChanges: jasmine.createSpy("snapshotChanges").and.returnValue({code: "SAM"})
};

const firestoreStub = {
    collection: jasmine.createSpy("collection").and.returnValue(collectionStub)
};

describe("ProjectService", () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [StoreModule.forRoot({})],
        providers: [{ provide: AngularFirestore, useValue: firestoreStub }, Store]
    }));

    it("should be created", () => {
        const service: ProjectService = TestBed.get(ProjectService);
        expect(service).toBeTruthy();
    });

    it("should make the call to return a collection of projects", () => {
        const service: ProjectService = TestBed.get(ProjectService);
        service.getProjects();
        expect(service.db.collection).toHaveBeenCalled();
    });
});
