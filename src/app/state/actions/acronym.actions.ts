import {Action, UPDATE} from "@ngrx/store";
import {Acronym} from "../../model/acronym.model";


export const ADD_ACRONYM       = "[ACRONYM] Add";
export const UPDATE_ACRONYM       = "[ACRONYM] Update";

export class AddAcronym implements Action {
    readonly type = ADD_ACRONYM;

    constructor(public payload: Acronym) {}
}

export class UpdateAcronym implements Action {
    readonly type = UPDATE_ACRONYM;

    constructor(public payload: Acronym) {}
}



export type Actions = AddAcronym | UpdateAcronym;
