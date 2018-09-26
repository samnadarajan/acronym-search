import {Action, UPDATE} from "@ngrx/store";
import {Acronym} from "../../model/acronym.model";

export const SEARCH_ACRONYM         = "[ACRONYM] Search";
export const SEARCH_ACRONYM_SUCCESS     = "[ACRONYM] Search Success";
export const SEARCH_ACRONYM_FAIL       = "[ACRONYM] Search Fail";
export const ADD_ACRONYM             = "[ACRONYM] Add";
export const ADD_ACRONYM_SUCCESS     = "[ACRONYM] Add Success";
export const ADD_ACRONYM_FAIL       = "[ACRONYM] Add Fail";
export const UPDATE_ACRONYM       = "[ACRONYM] Update";
export const UPDATE_ACRONYM_SUCCESS     = "[ACRONYM] Update Success";
export const UPDATE_ACRONYM_FAIL       = "[ACRONYM] Update Fail";

export class SearchAcronym implements  Action {
    readonly type = SEARCH_ACRONYM;

    constructor(public payload: Acronym) {}
}

export class SearchAcronymSuccess implements Action {
    readonly type = SEARCH_ACRONYM_SUCCESS;

    constructor(public payload: Acronym) {}
}

export class SearchAcronymFail implements Action {
    readonly type = SEARCH_ACRONYM_FAIL;

    constructor(public payload: any) {}
}

export class AddAcronym implements Action {
    readonly type = ADD_ACRONYM;

    constructor(public payload: Acronym) {}
}

export class UpdateAcronym implements Action {
    readonly type = UPDATE_ACRONYM;

    constructor(public payload: Acronym) {}
}



export type AcronymActions = SearchAcronym | SearchAcronymSuccess | SearchAcronymFail | AddAcronym | UpdateAcronym;
