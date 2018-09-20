import * as AcronymActions from "../actions/acronym.actions";
import {storeLogger} from "ngrx-store-logger";

export const initialState = {
    acronym: {}
};

export function acronymReducer(state = initialState, action: AcronymActions.Actions) {
    switch (action.type) {
        case AcronymActions.ADD_ACRONYM:
            // storeLogger({level: "info"});
            return {...state, acronym: action.payload};
        default:
            // storeLogger({level: "info"});
            return state;
    }
}
