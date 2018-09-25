import {Injectable} from "@angular/core";
import * as acronymActions from "../actions/acronym.actions";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {switchMap} from "rxjs/operators";
import {SearchService} from "../../services/search/search.service";

@Injectable()
export class AcronymEffect {
    constructor(private actions$: Actions) {}

    // @Effect()
    // addAcronym$ = this.actions$.pipe(
    //     ofType(acronymActions.SEARCH_ACRONYM),
    //     switchMap((action) => {
    //         console.log(action);
    //         return null;
    //     })
    // );
}
