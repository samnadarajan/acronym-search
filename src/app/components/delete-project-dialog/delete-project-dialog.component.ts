import {ChangeDetectionStrategy, Component, Inject} from "@angular/core";
import {Project} from "@app/model/project.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Store} from "@ngrx/store";
import {AppState} from "@app/store/app.state";
import * as ProjectActions from "../../store/actions/project.actions";
import {AddProjectDialogComponent} from "@app/components/add-project-dialog/add-project-dialog.component";

@Component({
    selector: "app-delete-project-dialog",
    templateUrl: "./delete-project-dialog.component.html",
    styleUrls: ["./delete-project-dialog.component.css"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteProjectDialogComponent {
    constructor(
        public store: Store<AppState>,
        @Inject(MAT_DIALOG_DATA) public project: Project,
    ) { }

    deleteProject() {
        this.store.dispatch(new ProjectActions.DeleteProject(this.project.id));
    }
}
