import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from "@angular/core";
import {Observable} from "rxjs";
import {Project} from "../../model/project.model";
import {FormControl} from "@angular/forms";

@Component({
    selector: "app-project-select",
    templateUrl: "./project-select.component.html",
    styleUrls: ["./project-select.component.css"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectSelectComponent {
    @Input() projects: Observable<Project[]>;
    @Output() selectedProject = new EventEmitter();

    chosenProject = new FormControl("");

    constructor() {}

    onChange(project: Project) {
        this.selectedProject.emit(project);
    }
}
