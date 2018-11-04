import {Action} from "@ngrx/store";
import {Project} from "@app/model/project.model";

export const LOAD_PROJECTS   =   "[PROJECTS] Load";
export const LOAD_PROJECTS_SUCCESS  =   "[PROJECTS] Load Success";
export const LOAD_PROJECTS_FAIL  =   "[PROJECTS] Load Fail";
export const SELECT_PROJECT   =   "[PROJECT] Select";
export const ADD_PROJECT =  "[PROJECT] Add Project";
export const ADD_PROJECT_SUCCESS =  "[PROJECT] Add Project Success";
export const ADD_PROJECT_FAIL =  "[PROJECT] Add Project Success";

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

export class AddProject implements Action {
    readonly type = ADD_PROJECT;

    constructor(public payload: Project) {}
}

export class AddProjectSuccess implements Action {
    readonly type = ADD_PROJECT_SUCCESS;

    constructor() {}
}

export class AddProjectFail implements Action {
    readonly type = ADD_PROJECT_FAIL;

    constructor(public payload: any) {}
}

export type Actions = LoadProjects | LoadProjectsSuccess | LoadProjectsFail | SelectProject | AddProject;
