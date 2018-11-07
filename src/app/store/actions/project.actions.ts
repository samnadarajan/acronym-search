import {Action} from "@ngrx/store";
import {Project} from "@app/model/project.model";
import {DefaultProject} from "@app/model/default-project.model";

export const LOAD_PROJECTS   =   "[PROJECTS] Load";
export const LOAD_PROJECTS_SUCCESS  =   "[PROJECTS] Load Success";
export const LOAD_PROJECTS_FAIL  =   "[PROJECTS] Load Fail";
export const SELECT_PROJECT   =   "[PROJECT] Select";
export const ADD_PROJECT =  "[PROJECT] Add Project";
export const ADD_PROJECT_SUCCESS =  "[PROJECT] Add Project Success";
export const ADD_PROJECT_FAIL =  "[PROJECT] Add Project Success";
export const SET_DEFAULT_PROJECT = "[PROJECT] Set Default";
export const SET_DEFAULT_PROJECT_SUCCESS = "[PROJECT] Set Default Success";
export const SET_DEFAULT_PROJECT_FAIL = "[PROJECT] Set Default Fail";
export const LOAD_DEFAULT_PROJECT = "[PROJECT] Load Defaults";
export const LOAD_DEFAULT_PROJECT_SUCCESS = "[PROJECT] Load Defaults Success";
export const LOAD_DEFAULT_PROJECT_FAIL = "[PROJECT] Load Defaults Fail";

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

    constructor(public payload: string) {}
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

export class SetDefaultProject implements Action {
    readonly type = SET_DEFAULT_PROJECT;

    constructor(public payload: DefaultProject) {}
}

export class SetDefaultProjectSuccess implements Action {
    readonly type = SET_DEFAULT_PROJECT_SUCCESS;

    constructor() {}
}

export class SetDefaultProjectFail implements Action {
    readonly type = SET_DEFAULT_PROJECT_FAIL;

    constructor(public payload: any) {}
}

export class LoadDefaultProject implements Action {
    readonly type = LOAD_DEFAULT_PROJECT;

    constructor(public payload: string) {}
}

export class LoadDefaultProjectSuccess implements Action {
    readonly type = LOAD_DEFAULT_PROJECT_SUCCESS;

    constructor(public payload: any) {}
}

export class LoadDefaultProjectFail implements Action {
    readonly type = LOAD_DEFAULT_PROJECT_FAIL;

    constructor(public payload: any) {}
}
export type Actions =
    LoadProjects |
    LoadProjectsSuccess |
    LoadProjectsFail |
    SelectProject |
    AddProject |
    SetDefaultProject |
    SetDefaultProjectSuccess |
    SetDefaultProjectFail |
    LoadDefaultProject |
    LoadDefaultProjectSuccess |
    LoadDefaultProjectFail;
