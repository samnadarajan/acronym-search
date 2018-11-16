import * as ProjectActions from "../actions/project.actions";
import {Project} from "@app/model/project.model";
import {storeLogger} from "ngrx-store-logger";
import {DefaultProject} from "@app/model/default-project.model";
import {createSelector} from "@ngrx/store";

export interface ProjectState {
    list: Project[];
    default: DefaultProject;
    selected: string;
    loaded: boolean;
}

export const initialState: ProjectState = {
    list: [],
    default: {} as DefaultProject,
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

export const getProjectList = (state: ProjectState) => state ? state.list : null;
export const getProjectDefault = (state: ProjectState) => state ? state.default : null;
export const getProjectSelected = (state: ProjectState) => state ? state.selected : null;
export const getProjectLoaded = (state: ProjectState) => state ? state.loaded : null;
