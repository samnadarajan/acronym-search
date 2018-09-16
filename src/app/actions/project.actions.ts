import {Action} from "@ngrx/store";
import {Project} from "../model/project.model";

export const LOAD_PROJECTS   =   "[PROJECTS] Load";

export class LoadProjects implements Action {
    readonly type = LOAD_PROJECTS;

    constructor(public payload: Project[]) {}
}

export type Actions = LoadProjects;
