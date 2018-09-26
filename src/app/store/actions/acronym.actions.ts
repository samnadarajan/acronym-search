import {Action, UPDATE} from "@ngrx/store";
import {Acronym} from "../../model/acronym.model";

export const SEARCH_ACRONYM         = "[ACRONYM] Search";
export const SEARCH_ACRONYM_SUCCESS     = "[ACRONYM] Search Success";
export const SEARCH_ACRONYM_FAIL       = "[ACRONYM] Search Fail";
export const SAVE_ACRONYM             = "[ACRONYM] Save";
export const SAVE_ACRONYM_SUCCESS     = "[ACRONYM] Save Success";
export const SAVE_ACRONYM_FAIL       = "[ACRONYM] Save Fail";

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

export class SaveAcronym implements Action {
    readonly type = SAVE_ACRONYM;

    constructor(public payload: any) {}
}

export class SaveAcronymSuccess implements Action {
    readonly type = SAVE_ACRONYM_SUCCESS;

    constructor(public payload: Acronym) {}
}

export class SaveAcronymFail implements Action {
    readonly type = SAVE_ACRONYM_FAIL;

    constructor(public payload: Acronym) {}
}




export type AcronymActions = SearchAcronym | SearchAcronymSuccess | SearchAcronymFail | SaveAcronym | SaveAcronymSuccess | SaveAcronymFail;
