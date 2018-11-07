import {Injectable} from "@angular/core";
import * as acronymActions from "../actions/acronym.actions";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {catchError, map, mergeMap, switchMap} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {Action} from "@ngrx/store";
import {SearchService} from "@app/services/search/search.service";
import {Acronym} from "@app/model/acronym.model";

@Injectable()
export class AcronymEffect {
    constructor(private actions$: Actions, private _searchService: SearchService) {}

    @Effect()
    searchAcronym$: Observable<Action> = this.actions$.pipe(
        ofType(acronymActions.SEARCH_ACRONYM),
        map((action: acronymActions.SearchAcronym) => action.payload),
        switchMap((payload) => {
            const code = payload["code"];
            const projectName = payload["project"];
            return this._searchService.search(code, projectName).pipe(
                map(actions => {
                    if (actions.length > 0) {
                        return actions.map(action => {
                            const data = action.payload.doc.data() as Acronym;
                            const id = action.payload.doc.id;
                            return {id, ...data};
                        })[0];
                    } else {
                        return {code: code, project: projectName} as Acronym;
                    }
                })
            );
        }),
        map(data => new acronymActions.SearchAcronymSuccess(data)),
        catchError(error => of(new acronymActions.SearchAcronymFail(error)))
    );

    @Effect()
    saveAcronym$ = this.actions$.pipe(
        ofType(acronymActions.SAVE_ACRONYM),
        map((action: acronymActions.SaveAcronym) => action.payload),
        mergeMap((payload) => {
            this._searchService.save(payload);
            return of(payload);
        }),
        map(data => new acronymActions.SaveAcronymSuccess(data)),
        catchError(error => of(new acronymActions.SaveAcronymFail(error)))
    );
}
