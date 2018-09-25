import {ActionReducerMap} from "@ngrx/store";

import * as fromAcronyms from "./acronym.reducer";
import * as fromProjects from "./project.reducer";

export interface State {
    acronym: fromAcronyms.AcronymState;
    projects: fromProjects.ProjectState;
}

export const reducers: ActionReducerMap<State> = {
    acronym: fromAcronyms.acronymReducer,
    projects: fromProjects.projectReducer
}
