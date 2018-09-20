import {Action} from "@ngrx/store";
import {Project} from "../model/project.model";

export const LOAD_PROJECTS   =   "[PROJECTS] Load";
export const SELECT_PROJECT   =   "[PROJECT] Select";

export class LoadProjects implements Action {
    readonly type = LOAD_PROJECTS;

    constructor(public payload: Project[]) {}
}

export class SelectProject implements Action {
    readonly type = SELECT_PROJECT;

    constructor(public payload: Project) {}
}

export type Actions = LoadProjects | SelectProject;
