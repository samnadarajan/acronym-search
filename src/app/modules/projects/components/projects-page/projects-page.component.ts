import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from "@angular/core";
import * as ProjectActions from "../../../../store/actions/project.actions";
import {select, Store} from "@ngrx/store";
import {AppState} from "../../../../store/app.state";
import {Project} from "../../../../model/project.model";
import {Observable, SubscriptionLike} from "rxjs";
import {map} from "rxjs/operators";
import {User} from "../../../../model/user.model";
import {DefaultProject} from "../../../../model/default-project.model";
import {getAllProjects, getDefaultProject} from "../../../../store/selectors/project.selectors";
import {ISubscribe} from "../../../../interfaces/subscribe.interface";
import {MatDialog, MatSnackBar} from "@angular/material";
import {AddProjectDialogComponent} from "../add-project-dialog/add-project-dialog.component";
import {DeleteProjectDialogComponent} from "../delete-project-dialog/delete-project-dialog.component";

@Component({
    selector: "app-projects-page",
    templateUrl: "./projects-page.component.html",
    styleUrls: ["./projects-page.component.css"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsPageComponent implements ISubscribe, OnDestroy {
    projectList$: Observable<Project[]>;
    defaultProject$: Observable<DefaultProject>;
    currentUser$: Observable<User>;

    currentDefaultProject: DefaultProject;
    user: User;

    defaultSub$: SubscriptionLike;
    userSub$: SubscriptionLike;

    constructor(public store: Store<AppState>, public snackBar: MatSnackBar, public dialog: MatDialog) {
        this.projectList$ = this.store.pipe(select(getAllProjects));
        this.defaultProject$ = this.store.pipe(select(getDefaultProject));
        this.currentUser$ = this.store.pipe(select(state => state.authUser), map(data => data ? data["user"] : null));
        this.setupSubscriptions();
    }

    setupSubscriptions() {
        this.defaultSub$ = this.defaultProject$.subscribe(data => {
            this.currentDefaultProject = data;
        });

        this.userSub$ = this.currentUser$.subscribe(user => {
            this.user = user;
        });
    }

    openAddDialog(projectList) {
        this.dialog.open(AddProjectDialogComponent, {
            data: projectList,
            width: "20%"
        });
    }

    makeDefault(projectName: string) {
        if (this.currentDefaultProject) {
            this.currentDefaultProject.projectName = projectName;
        } else {
            this.currentDefaultProject = {uid: this.user.uid, projectName: projectName};
        }
        this.store.dispatch(new ProjectActions.SetDefaultProject(this.currentDefaultProject));
        this.snackBar.open(`${projectName} is now your default project`, "Dismiss", {duration: 3000});
    }

    openDeleteDialog(project: Project) {
        this.dialog.open(DeleteProjectDialogComponent, {
            data: project
        });
    }

    ngOnDestroy() {
        this.destroySubscriptions();
    }

    destroySubscriptions() {
        if (this.defaultSub$) {
            this.defaultSub$.unsubscribe();
        }

        if (this.userSub$) {
            this.userSub$.unsubscribe();
        }
    }

}
