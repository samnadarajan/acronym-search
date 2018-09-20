import * as ProjectActions from "../actions/project.actions";

const initialState = {
    projects: [],
    selectedProject: {}
}

export function projectReducer(state = initialState, action: ProjectActions.Actions) {
    switch (action.type) {
        case(ProjectActions.LOAD_PROJECTS):
            return {...state, projects: action.payload};
        case(ProjectActions.SELECT_PROJECT):
            // storeLogger({level: "info"});
            return {...state, selectedProject: action.payload};
        default:
            return state;
    }
}
