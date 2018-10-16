import {BehaviorSubject, Observable} from "rxjs";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {Store} from "@ngrx/store";
import {TestBed} from "@angular/core/testing";
import {provideMockActions} from "@ngrx/effects/testing";
import {AngularFirestore} from "@angular/fire/firestore";
import {ProjectService} from "@app/services/project/project.service";
import {cold, hot} from "jasmine-marbles";
import * as fromActions from "@app/store/actions/project.actions";
import {ProjectEffect} from "@app/store/effects/project.effect";

const FirestoreStub = {
    collection: (name: string) => ({
        doc: (_id: string) => ({
            valueChanges: () => new BehaviorSubject({ foo: "bar" }),
            set: (_d: any) => new Promise((resolve, _reject) => resolve()),
        }),
    }),
};

describe("Project Effects", () => {
    let actions: Observable<any>;
    let effects: ProjectEffect;
    let projectService: ProjectService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ProjectEffect,
                Store,
                provideMockActions(() => actions),
                { provide: AngularFirestore, useValue: FirestoreStub },
                {
                    provide: ProjectService, useValue: ["getProjects"]
                }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        });

        effects = TestBed.get(ProjectEffect);
        projectService = TestBed.get(ProjectService);
    });

    it("should be created", () => {
        expect(effects).toBeTruthy();
    });

    describe("Load Projects", () => {
        it("should return a LoadProjectsSuccess action, with projects, on success", () => {
            const payload = [{name: "SAM", id: "321rwfe"}, {name: "SAMN", id: "23rwfergt"}];
            const action = new fromActions.LoadProjects(payload);
            const result = new fromActions.LoadProjectsSuccess(payload);

            actions = hot("-a", {a: action});
            const response = cold("-c|", {c: payload});
            const expected = cold("--b", {b: result});

            projectService.getProjects = jest.fn(() => response);

            expect(effects.loadProjects$).toBeObservable(expected);
        });

        it("should return a LoadProjectsFail action, with projects, on fail", () => {
            const payload = [{name: "SAM", id: "321rwfe"}, {name: "SAMN", id: "23rwfergt"}];
            const action = new fromActions.LoadProjects(payload);
            const error = new Error();
            const result = new fromActions.LoadProjectsFail(error);

            actions = hot("-a", {a: action});
            const response = cold("-#|", {}, error);
            const expected = cold("--(b|)", {b: result});

            projectService.getProjects = jest.fn(() => response);

            expect(effects.loadProjects$).toBeObservable(expected);
        });
    });
});
