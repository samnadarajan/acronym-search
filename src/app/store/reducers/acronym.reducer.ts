import * as AcronymActions from "../actions/acronym.actions";
import {storeLogger} from "ngrx-store-logger";
import {Acronym} from "../../model/acronym.model";

export interface AcronymState {
    acronym: Acronym;
}
export const initialState: AcronymState = {
    acronym: {code: ""}
};

export function acronymReducer(state = initialState, action: AcronymActions.AcronymActions) {
    switch (action.type) {
        case AcronymActions.SEARCH_ACRONYM:
        // case AcronymActions.UPDATE_ACRONYM:
        // case AcronymActions.ADD_ACRONYM:
            // storeLogger({level: "info"});
            return {...state, acronym: action.payload};
        case AcronymActions.SEARCH_ACRONYM_SUCCESS:
            return {...state, loading: false, loaded: true};
        case AcronymActions.SEARCH_ACRONYM_FAIL:
            return {...state, loading: false, loaded: false};
        default:
            // storeLogger({level: "info"});
            return state;
    }
}
