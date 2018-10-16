import {Project} from "./project.model";

export interface Projects {
    list: Project[];
    selected?: Project;
}
