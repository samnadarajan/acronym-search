import * as ProjectActions from "../actions/project.actions";
import {Project} from "@app/model/project.model";
import {storeLogger} from "ngrx-store-logger";
import {DefaultProject} from "@app/model/default-project.model";

export interface ProjectState {
    list: Project[];
    defaultList: DefaultProject[];
    selected: string;
    loaded: boolean;
}

export const initialState: ProjectState = {
    list: [],
    defaultList: [],
    selected: "",
    loaded: true
};

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
        case(ProjectActions.LOAD_DEFAULT_PROJECT_SUCCESS):
            return {...state, default: action.payload};
        default:
            return state;
    }
}
