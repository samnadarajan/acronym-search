import {Acronym} from "./model/acronym.model";
import {Projects} from "./model/projects.model";

export interface AppState {
    readonly acronym: Acronym;
    readonly projects: Projects;
}
