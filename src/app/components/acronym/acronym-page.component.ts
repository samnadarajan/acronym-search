import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from "@angular/core";
import {Acronym} from "@app/model/acronym.model";
import {AppState} from "@app/store/app.state";
import {Observable, SubscriptionLike} from "rxjs";
import {select, Store} from "@ngrx/store";
import {Project} from "@app/model/project.model";
import * as AcronymActions from "../../store/actions/acronym.actions";
import * as ProjectActions from "../../store/actions/project.actions";
import {ISubscribe} from "@app/interfaces/subscribe.interface";
import {AuthService} from "@app/modules/auth/services/auth/auth.service";
import {map} from "rxjs/operators";


@Component({
    selector: "app-acronym",
    templateUrl: "./acronym-page.component.html",
    styleUrls: ["./acronym-page.component.css"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AcronymPageComponent implements ISubscribe, OnInit, OnDestroy {
    acronymResult$: Observable<Acronym>;
    acronymLoading$: Observable<boolean>;
    projectList$: Observable<Project[]>;
    selectedProject$: Observable<Project>;

    _acronym$: SubscriptionLike;
    acronymResultState: Acronym;

    constructor(public store: Store<AppState>, public authService: AuthService) {
        this.acronymResult$ = this.store.pipe(select(state => state.acronym), map(data => data ? data["acronym"] : null));
        this.acronymLoading$ = this.store.pipe(select(state => state.acronym), map(data => data ? data["loading"] : null));
        this.projectList$ = this.store.pipe(select(state => state.projects), map(data => data ? data["list"] : null));
        this.selectedProject$ = this.store.pipe(select(state => state.projects), map(data => data ? data["selected"] : null));
        this.setupSubscriptions();

        this.acronymResultState = {code: "", project: ""};
    }

    ngOnInit() {
        this.store.dispatch(new ProjectActions.LoadProjects([]));
    }

    setupSubscriptions() {
        this._acronym$ = this.acronymResult$.subscribe(data => {
            if (data && data["acronym"]) {
                this.acronymResultState = data["acronym"];
            }
        });
    }

    beginSearch(code: string, project: Project) {
        if (code !== this.acronymResultState.code) {
            this.store.dispatch(new AcronymActions.SearchAcronym({code: code, project: project.name}));
        }
    }

    save(acronym: Acronym, project: Project) {
        acronym.project = project.name;
        this.store.dispatch(new AcronymActions.SaveAcronym(acronym));
    }

    ngOnDestroy() {
        this.destroySubscriptions();
    }

    destroySubscriptions() {
        if (this._acronym$) {
            this._acronym$.unsubscribe();
        }
    }
}
