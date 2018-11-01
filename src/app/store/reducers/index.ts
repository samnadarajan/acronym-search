import {ActionReducerMap} from "@ngrx/store";

import * as fromAcronyms from "./acronym.reducer";
import * as fromProjects from "./project.reducer";
import * as fromAuthUser from "./auth-user.reducer";

export interface State {
    acronym: fromAcronyms.AcronymState;
    projects: fromProjects.ProjectState;
    authUser: fromAuthUser.AuthUserState;
}

export const reducers: ActionReducerMap<State> = {
    acronym: fromAcronyms.acronymReducer,
    projects: fromProjects.projectReducer,
    authUser: fromAuthUser.authUserReducer
};
