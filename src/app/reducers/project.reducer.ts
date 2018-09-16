import * as ProjectActions from "../actions/project.actions";

const initialState = {
    projects: []
}

export function projectReducer(state = initialState, action: ProjectActions.Actions) {
    switch (action.type) {
        case(ProjectActions.LOAD_PROJECTS):
            return {...state, projects: action.payload};
        default:
            return state;
    }
}
