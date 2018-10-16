import * as AcronymActions from "../actions/acronym.actions";
import {Acronym} from "../../model/acronym.model";

export interface AcronymState {
    acronym: Acronym;
    loading: boolean;
    loaded: boolean;
}
export const initialState: AcronymState = {
    acronym: null,
    loading: false,
    loaded: true
};

export function acronymReducer(state = initialState, action: AcronymActions.AcronymActions) {
    switch (action.type) {
        case AcronymActions.SEARCH_ACRONYM:
        case AcronymActions.SAVE_ACRONYM:
            return {...state, loading: true, loaded: false};
        case AcronymActions.SEARCH_ACRONYM_SUCCESS:
        case AcronymActions.SAVE_ACRONYM_SUCCESS:
            return {...state, acronym: action.payload, loading: false, loaded: true};
        case AcronymActions.SEARCH_ACRONYM_FAIL:
        case AcronymActions.SAVE_ACRONYM_FAIL:
            return {...state, loading: false, loaded: true};
        default:
            return state;
    }
}
