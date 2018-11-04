import {ChangeDetectionStrategy, Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA} from "@angular/material";
import {Project} from "@app/model/project.model";
import {FormControl} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppState} from "@app/store/app.state";
import * as ProjectActions from "../../store/actions/project.actions";

@Component({
    selector: "app-project-modal",
    templateUrl: "./project-modal.component.html",
    styleUrls: ["./project-modal.component.css"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectModalComponent {
    projectName = new FormControl("");

    constructor(@Inject(MAT_DIALOG_DATA) public data: Project[], public store: Store<AppState>) { }

    addProject(newProjectName: string) {
        this.store.dispatch(new ProjectActions.AddProject({name: newProjectName}));
    }
}
