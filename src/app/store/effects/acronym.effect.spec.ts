import {BehaviorSubject, Observable, of} from "rxjs";
import {AcronymEffect} from "./acronym.effect";
import {TestBed} from "@angular/core/testing";
import {provideMockActions} from "@ngrx/effects/testing";
import * as fromActions from "../actions/acronym.actions";
import {cold, hot} from "jasmine-marbles";
import {Store} from "@ngrx/store";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {AngularFirestore} from "@angular/fire/firestore";
import {SearchService} from "@app/modules/acronyms/services/search/search.service";

const FirestoreStub = {
    collection: (name: string) => ({
        doc: (_id: string) => ({
            snapshotChanges: () => new BehaviorSubject({ foo: "bar" }),
            set: (_d: any) => new Promise((resolve, _reject) => resolve()),
        }),
    }),
};

describe("Acronym Effects", () => {
    let actions: Observable<any>;
    let effects: AcronymEffect;
    let searchService: SearchService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AcronymEffect,
                Store,
                provideMockActions(() => actions),
                { provide: AngularFirestore, useValue: FirestoreStub },
                {
                    provide: SearchService, useValue: ["search", "save", "add", "update"]
                }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        });

        effects = TestBed.get(AcronymEffect);
        searchService = TestBed.get(SearchService);
    });

    it("should be created", () => {
        expect(effects).toBeTruthy();
    });

    describe("Search Acronym", () => {
        it("should return a SearchAcronymSuccess action, with the acronym, on success", () => {
            const payload = {code: "SAM", project: "SWAN"};
            const action = new fromActions.SearchAcronym(payload);
            const result = new fromActions.SearchAcronymSuccess(payload);

            actions = hot("--a-", {a: action});
            const response = cold("c|", { c: payload });
            const expected = cold("--b", {b: result});

            searchService.search = jest.fn(() => response);

            expect(effects.searchAcronym$).toBeObservable(expected);
        });

        it("should return a SearchAcronymFail action, with an error, on fail", () => {
            const payload = {code: "SAM", project: "SWAN"};
            const action = new fromActions.SearchAcronym(payload);
            const error = new Error();
            const result = new fromActions.SearchAcronymFail(error);

            actions = hot("-a", {a: action});
            const response = cold("-#|", {}, error);
            const expected = cold("--(b|)", {b: result});

            searchService.search = jest.fn(() => response);

            expect(effects.searchAcronym$).toBeObservable(expected);
        });
    });

    describe("Save Acronym", () => {
        it("should return a SaveAcronymSuccess action, with the acronym, on success", () => {
            const payload = {code: "SAM", project: "SWAN"};
            const action = new fromActions.SaveAcronym(payload);
            const result = new fromActions.SaveAcronymSuccess(payload);

            actions = hot("-a", {a: action});
            const response = cold("-c|", { c: payload });
            const expected = cold("-b", {b: result});

            searchService.save = jest.fn(() => response);

            expect(effects.saveAcronym$).toBeObservable(expected);
        });

        // it("should return a SaveAcronymFail action, with an error, on fail", () => {
        //     const payload = {code: "SAM", project: "SWAN"};
        //     const action = new fromActions.SaveAcronym(payload);
        //     const error = new Error();
        //     const acronym-result = new fromActions.SaveAcronymFail(error);
        //
        //     actions = hot("-a", {a: action});
        //     const response = cold("-#|", {}, error);
        //     const expected = cold("--(b|)", {b: acronym-result});
        //
        //     searchService.save = jest.fn(() => response);
        //
        //     expect(effects.saveAcronym$).toBeObservable(expected);
        // });
    });
});
