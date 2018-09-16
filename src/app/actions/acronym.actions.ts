import {Action} from "@ngrx/store";
import {Acronym} from "../model/acronym.model";


export const ADD_ACRONYM       = "[ACRONYM] Add";

export class AddAcronym implements Action {
    readonly type = ADD_ACRONYM;

    constructor(public payload: Acronym) {}
}


export type Actions = AddAcronym;
