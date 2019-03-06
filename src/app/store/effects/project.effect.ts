import {Injectable} from "@angular/core";
import {ProjectService} from "@app/modules/projects/services/project/project.service";
import {Actions, Effect, ofType} from "@ngrx/effects";
import * as projectActions from "../actions/project.actions";
import {catchError, map, switchMap} from "rxjs/operators";
import {Project} from "@app/model/project.model";
import {of} from "rxjs";
import {DefaultProject} from "@app/model/default-project.model";
import {AppState} from "@app/store/app.state";
import {Store} from "@ngrx/store";

@Injectable()
export class ProjectEffect {
    constructor(private actions$: Actions, private store$: Store<AppState>, private _projectService: ProjectService) {}

    @Effect()
    loadProjects$ = this.actions$.pipe(
        ofType(projectActions.LOAD_PROJECTS),
        switchMap(() => {
            return this._projectService.getProjects().pipe(
                map(changes => {
                    return changes.map(action => {
                        const data = action.payload.doc.data() as Project[];
                        const id = action.payload.doc.id;
                        return {id, ...data};
                    });
                })
            );
        }),
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
        switchMap((payload) => {
            return this._projectService.getDefaultProject(payload).pipe(
                map(changes => {
                    if (changes.length > 0) {
                        return changes.map(action => {
                            const data = action.payload.doc.data() as DefaultProject;
                            const id = action.payload.doc.id;
                            return {id, ...data};
                        })[0];
                    }
                })
            );
        }),
        map((data: DefaultProject) => new projectActions.LoadDefaultProjectSuccess(data)),
        catchError((error) => of(new projectActions.LoadDefaultProjectFail(error)))
    );

    @Effect()
    setDefaultProject$ = this.actions$.pipe(
        ofType(projectActions.SET_DEFAULT_PROJECT),
        map((action: projectActions.SetDefaultProject) => action.payload),
        switchMap((data: DefaultProject) => {
            this._projectService.changeDefault(data);
            return of(data);
        }),
        map(() => new projectActions.SetDefaultProjectSuccess()),
        catchError((error) => of(new projectActions.SetDefaultProjectFail(error)))
    );

    @Effect({dispatch: false})
    deleteProject$ = this.actions$.pipe(
        ofType(projectActions.DELETE_PROJECT),
        map((action: projectActions.DeleteProject) => action.payload),
        switchMap((id: string) => {
            this._projectService.delete(id);
            return of(null);
        })
    );
}
