import { Component } from "@angular/core";
import * as ProjectActions from "../../store/actions/project.actions";
import {select, Store} from "@ngrx/store";
import {AppState} from "@app/store/app.state";
import {FormControl} from "@angular/forms";
import {Project} from "@app/model/project.model";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {User} from "@app/model/user.model";
import {DefaultProject} from "@app/model/default-project.model";
import {getAllProjects, getDefaultProject} from "@app/store/selectors/project.selectors";

@Component({
  selector: "app-projects-page",
  templateUrl: "./projects-page.component.html",
  styleUrls: ["./projects-page.component.css"]
})
export class ProjectsPageComponent {
    projectName = new FormControl("");
    projectList$: Observable<Project[]>;
    defaultProject$: Observable<DefaultProject>;
    currentUser$: Observable<User>;

    constructor(public store: Store<AppState>) {
        this.projectList$ = this.store.pipe(select(getAllProjects));
        this.defaultProject$ = this.store.pipe(select(getDefaultProject));
        this.currentUser$ = this.store.pipe(select(state => state.authUser), map(data => data ? data["user"] : null));
    }

    addProject(newProjectName: string) {
        this.store.dispatch(new ProjectActions.AddProject({name: newProjectName}));
    }

    makeDefault(projectName: string, currentDefaultProject: DefaultProject) {
        console.log({currentDefaultProject});
        this.store.dispatch(new ProjectActions.SetDefaultProject({uid: currentDefaultProject.uid, projectName: projectName}));
    }

}
