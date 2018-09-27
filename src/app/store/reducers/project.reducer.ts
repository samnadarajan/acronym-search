import * as ProjectActions from "../actions/project.actions";
import {Project} from "../../model/project.model";
import {storeLogger} from "ngrx-store-logger";

export interface ProjectState {
    list: Project[];
    selected: any;
    loaded: boolean;
}

const initialState: ProjectState = {
    list: [],
    selected: {},
    loaded: true
}

export function projectReducer(state = initialState, action: ProjectActions.Actions) {
    switch (action.type) {
        case(ProjectActions.LOAD_PROJECTS):
            return {...state, loaded: false};
        case(ProjectActions.LOAD_PROJECTS_SUCCESS):
            storeLogger({level: "info"});
            return {...state, list: action.payload, loaded: true};
        case(ProjectActions.LOAD_PROJECTS_FAIL):
            return {...state, loaded: true};
        case(ProjectActions.SELECT_PROJECT):
            return {...state, selected: action.payload};
        default:
            return state;
    }
}
