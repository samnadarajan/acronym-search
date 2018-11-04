import {Acronym} from "../model/acronym.model";
import {Projects} from "../model/projects.model";
import {User} from "@app/model/user.model";

export interface AppState {
    readonly acronym: Acronym;
    readonly projects: Projects;
    readonly authUser: User;
}
