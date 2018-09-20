import * as ProjectActions from "../actions/project.actions";

const initialState = {
    list: [],
    selected: {}
}

export function projectReducer(state = initialState, action: ProjectActions.Actions) {
    switch (action.type) {
        case(ProjectActions.LOAD_PROJECTS):
            return {...state, list: action.payload};
        case(ProjectActions.SELECT_PROJECT):
            return {...state, selected: action.payload};
        default:
            return state;
    }
}
