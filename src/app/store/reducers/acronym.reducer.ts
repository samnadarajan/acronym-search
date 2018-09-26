import * as AcronymActions from "../actions/acronym.actions";
import {Acronym} from "../../model/acronym.model";

export interface AcronymState {
    acronym: Acronym;
    loading: boolean;
    loaded: boolean;
}
export const initialState: AcronymState = {
    acronym: {code: ""},
    loading: false,
    loaded: true
};

export function acronymReducer(state = initialState, action: AcronymActions.AcronymActions) {
    switch (action.type) {
        case AcronymActions.SEARCH_ACRONYM:
        case AcronymActions.SAVE_ACRONYM:
            // storeLogger({level: "info"});
            return {...state, loading: true, loaded: false};
        case AcronymActions.SAVE_ACRONYM_SUCCESS:
        case AcronymActions.SEARCH_ACRONYM_SUCCESS:
            return {...state, acronym: action.payload, loaded: true};
        case AcronymActions.SAVE_ACRONYM_FAIL:
        case AcronymActions.SEARCH_ACRONYM_FAIL:
            return {...state, loading: false, loaded: true};
        default:
            return state;
    }
}
