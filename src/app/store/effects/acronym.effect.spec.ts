import {BehaviorSubject, Observable, of} from "rxjs";
import {AcronymEffect} from "./acronym.effect";
import {SearchService} from "../../services/search/search.service";
import {TestBed} from "@angular/core/testing";
import {provideMockActions} from "@ngrx/effects/testing";
import * as fromActions from "../actions/acronym.actions";
import {cold, hot} from "jasmine-marbles";
import {Store} from "@ngrx/store";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {AngularFirestore} from "@angular/fire/firestore";
import {Actions} from "@ngrx/effects";

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
                // SearchService
                {
                    provide: SearchService,
                    useValue: ["search", "save", "add", "update"]
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

            actions = cold("--a-", {a: action});
            const expected = cold("--b", {b: result});

            searchService.search = () => cold("c|", { c: payload });

            expect(effects.searchAcronym$).toBeObservable(expected);
        });
    });
});
