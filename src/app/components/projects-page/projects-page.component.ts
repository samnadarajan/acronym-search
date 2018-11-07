import { Component } from "@angular/core";
import * as ProjectActions from "../../store/actions/project.actions";
import {select, Store} from "@ngrx/store";
import {AppState} from "@app/store/app.state";
import {FormControl} from "@angular/forms";
import {Project} from "@app/model/project.model";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {User} from "@app/model/user.model";
import {ProjectService} from "@app/services/project/project.service";

@Component({
  selector: "app-projects-page",
  templateUrl: "./projects-page.component.html",
  styleUrls: ["./projects-page.component.css"]
})
export class ProjectsPageComponent {
    projectName = new FormControl("");
    projectList$: Observable<Project[]>;
    currentUser$: Observable<User>;

    constructor(public store: Store<AppState>, private projectService: ProjectService) {
        this.projectList$ = this.store.pipe(select(state => state.projects), map(data => data ? data["list"] : null));
        this.currentUser$ = this.store.pipe(select(state => state.authUser), map(data => data ? data["user"] : null));
    }

    addProject(newProjectName: string) {
        this.store.dispatch(new ProjectActions.AddProject({name: newProjectName}));
    }

    makeDefault(projectName: string, currentUser: User) {
        currentUser.defaultProject = projectName;
        // this.projectService.setProjectAsDefault(currentUser);
    }

}
