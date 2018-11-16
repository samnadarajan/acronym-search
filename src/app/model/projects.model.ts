import {Project} from "./project.model";
import {DefaultProject} from "@app/model/default-project.model";

export interface Projects {
    list: Project[];
    default: DefaultProject;
    selected?: string;
}
