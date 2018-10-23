import {Action} from "@ngrx/store";
import {Project} from "@app/model/project.model";

export const LOAD_PROJECTS   =   "[PROJECTS] Load";
export const LOAD_PROJECTS_SUCCESS  =   "[PROJECTS] Load Success";
export const LOAD_PROJECTS_FAIL  =   "[PROJECTS] Load Fail";
export const SELECT_PROJECT   =   "[PROJECT] Select";

export class LoadProjects implements Action {
    readonly type = LOAD_PROJECTS;

    constructor(public payload: Project[]) {}
}

export class LoadProjectsSuccess implements Action {
    readonly type = LOAD_PROJECTS_SUCCESS;

    constructor(public payload: Project[]) {}
}

export class LoadProjectsFail implements Action {
    readonly type = LOAD_PROJECTS_FAIL;

    constructor(public payload: any) {}
}

export class SelectProject implements Action {
    readonly type = SELECT_PROJECT;

    constructor(public payload: Project) {}
}

export type Actions = LoadProjects | LoadProjectsSuccess | LoadProjectsFail | SelectProject;
