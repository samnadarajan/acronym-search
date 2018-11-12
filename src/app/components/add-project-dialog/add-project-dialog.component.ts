import {Component, Inject} from "@angular/core";
import * as ProjectActions from "@app/store/actions/project.actions";
import {Store} from "@ngrx/store";
import {AppState} from "@app/store/app.state";
import {MAT_DIALOG_DATA} from "@angular/material";
import {Project} from "@app/model/project.model";
import {FormControl} from "@angular/forms";

@Component({
  selector: "app-add-project-dialog",
  templateUrl: "./add-project-dialog.component.html",
  styleUrls: ["./add-project-dialog.component.css"]
})
export class AddProjectDialogComponent {
    addProjectForm = new FormControl("");

    error: string;
    isValid: boolean;

    constructor(public store: Store<AppState>, @Inject(MAT_DIALOG_DATA) public projectList: Project[]) { }

    validate(newProject: string) {
        if (this.projectList.some((p) => p.name.toLowerCase() === newProject.toLowerCase())) {
            this.isValid = false;
            this.error = "Project already exists, please enter a new project";
        } else {
            this.addProject(newProject);
            this.error = null;
            this.isValid = true;
        }
    }

    addProject(newProjectName: string) {
        this.store.dispatch(new ProjectActions.AddProject({name: newProjectName}));
    }
}
