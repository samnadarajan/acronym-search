import {Injectable} from "@angular/core";
import {ProjectService} from "../../services/project/project.service";
import {Actions, Effect, ofType} from "@ngrx/effects";
import * as projectActions from "../actions/project.actions";
import {catchError, map, switchMap} from "rxjs/operators";
import {Project} from "../../model/project.model";
import {of} from "rxjs";

@Injectable()
export class ProjectEffect {
    constructor(private actions$: Actions, private _projectService: ProjectService) {}

    @Effect()
    loadProjects$ = this.actions$.pipe(
        ofType(projectActions.LOAD_PROJECTS),
        map((action: projectActions.LoadProjects) => action.payload),
        switchMap(() => {
            return this._projectService.getProjects().pipe(
                map((projects: Project[]) => {
                    console.log(projects);
                }),
                catchError((error) => of(new projectActions.LoadProjectsFail(error)))
            );
        }),
        map(data => {
            console.log(data)
            return new projectActions.LoadProjectsSuccess(data);
        })
    );
}
