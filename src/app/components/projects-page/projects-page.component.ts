import { Component } from "@angular/core";
import * as ProjectActions from "@app/store/actions/project.actions";
import {select, Store} from "@ngrx/store";
import {AppState} from "@app/store/app.state";
import {FormControl} from "@angular/forms";
import {Project} from "@app/model/project.model";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: "app-projects-page",
  templateUrl: "./projects-page.component.html",
  styleUrls: ["./projects-page.component.css"]
})
export class ProjectsPageComponent {
    projectName = new FormControl("");
    projectList$: Observable<Project[]>;

    constructor(public store: Store<AppState>) {
        this.projectList$ = this.store.pipe(select(state => state.projects), map(data => data ? data["list"] : null));
    }

    addProject(newProjectName: string) {
        this.store.dispatch(new ProjectActions.AddProject({name: newProjectName}));
    }

}
