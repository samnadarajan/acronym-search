import { TestBed, inject } from "@angular/core/testing";

import {AngularFirestore} from "@angular/fire/firestore";
import {SearchService} from "./search.service";
import {config} from "../../app.config";

const collectionStub = {
    valueChanges: jasmine.createSpy("valueChanges").and.returnValue({code: "SAM"})
}
const firestoreStub = {
    collection: jasmine.createSpy("collection").and.returnValue(collectionStub)
}

describe("SearchService", () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [SearchService, { provide: AngularFirestore, useValue: firestoreStub }]
        });
    });

    it("should be created", inject([SearchService], (service: SearchService) => {
        expect(service).toBeTruthy();
    }));

    it("should make the call to return an acronym", inject([SearchService], (service: SearchService) => {
        service.search("SAM", "Hello");
        expect(service.db.collection).toHaveBeenCalledWith(config.acronyms, jasmine.any(Function));
    }));

    it("should call the method to add the acronym", inject([SearchService], (service: SearchService) => {
        const acronym = {code: "SAM", meaning: "Start Achieve Master", description: "An old business plan I wrote in high school"};
        spyOn(service, "add");
        spyOn(service, "update");

        service.save(acronym);

        expect(service.add).toHaveBeenCalledWith(acronym);
        expect(service.update).not.toHaveBeenCalled();
    }));

    it("should call the method to update the acronym", inject([SearchService], (service: SearchService) => {
        const acronym = {code: "SAM", id: "2345trfer32", meaning: "Start Achieve Master", description: "An old plan from high school"};
        spyOn(service, "update");
        spyOn(service, "add");

        service.save(acronym);

        expect(service.update).toHaveBeenCalledWith(acronym);
        expect(service.add).not.toHaveBeenCalled();
    }));

});
