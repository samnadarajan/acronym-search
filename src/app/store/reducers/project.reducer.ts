import * as ProjectActions from "../actions/project.actions";
import {Project} from "../../model/project.model";

export interface ProjectState {
    list: Project[];
    selected: any;
}

const initialState: ProjectState = {
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
