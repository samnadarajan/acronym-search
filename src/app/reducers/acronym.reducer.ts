import * as AcronymActions from "../actions/acronym.actions";

export const initialState = {
    acronym: {}
};

export function acronymReducer(state = initialState, action: AcronymActions.Actions) {
    switch (action.type) {
        case AcronymActions.ADD_ACRONYM:
            return {...state, acronym: action.payload};
        default:
            return state;
    }
}
