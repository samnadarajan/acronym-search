import {Acronym} from "./model/acronym.model";
import {Project} from "./model/project.model";

export interface AppState {
    readonly acronym: Acronym;
    readonly projects: Project[];
}
