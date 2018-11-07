import {Injectable} from "@angular/core";
import {ProjectService} from "@app/services/project/project.service";
import {Actions, Effect, ofType} from "@ngrx/effects";
import * as projectActions from "../actions/project.actions";
import {catchError, map, switchMap, take} from "rxjs/operators";
import {Project} from "@app/model/project.model";
import {of} from "rxjs";
import {DefaultProject} from "@app/model/default-project.model";

@Injectable()
export class ProjectEffect {
    constructor(private actions$: Actions, private _projectService: ProjectService) {}

    @Effect()
    loadProjects$ = this.actions$.pipe(
        ofType(projectActions.LOAD_PROJECTS),
        switchMap(() => this._projectService.getProjects()),
        map((data: Project[]) => new projectActions.LoadProjectsSuccess(data)),
        catchError((error) => of(new projectActions.LoadProjectsFail(error)))

    );

    @Effect()
    addProject$ = this.actions$.pipe(
        ofType(projectActions.ADD_PROJECT),
        map((action: projectActions.AddProject) => action.payload),
        switchMap((data: Project) => this._projectService.addProject(data)),
        map(() => new projectActions.AddProjectSuccess()),
        catchError((error) => of(new projectActions.LoadProjectsFail(error)))
    );

    @Effect()
    loadDefaultProject$ = this.actions$.pipe(
        ofType(projectActions.LOAD_DEFAULT_PROJECT),
        map((action: projectActions.LoadDefaultProject) => action.payload),
        switchMap((data) => {
            return this._projectService.getDefaultProject(data).pipe(
                map(changes => changes.length > 0 ? changes[0] : data)
            );
        }),
        map((data: DefaultProject) => new projectActions.LoadDefaultProjectSuccess(data)),
        catchError((error) => of(new projectActions.LoadDefaultProjectFail(error)))
    );

    @Effect()
    setDefaultProejct$ = this.actions$.pipe(
        ofType(projectActions.SET_DEFAULT_PROJECT),
        map((action: projectActions.SetDefaultProject) => action.payload),
        switchMap((data: DefaultProject) => this._projectService.setProjectAsDefault(data)),
        map(() => new projectActions.SetDefaultProjectSuccess()),
        catchError((error) => of(new projectActions.SetDefaultProjectFail(error)))
    )
}
