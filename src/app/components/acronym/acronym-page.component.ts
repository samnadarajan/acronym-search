import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from "@angular/core";
import {Acronym} from "@app/model/acronym.model";
import {AppState} from "@app/store/app.state";
import {Observable, SubscriptionLike} from "rxjs";
import {select, Store} from "@ngrx/store";
import {Project} from "@app/model/project.model";
import {Projects} from "@app/model/projects.model";
import * as AcronymActions from "../../store/actions/acronym.actions";
import * as ProjectActions from "../../store/actions/project.actions";
import {ISubscribe} from "@app/interfaces/subscribe.interface";
import {User} from "@app/model/user.model";


@Component({
    selector: "app-acronym",
    templateUrl: "./acronym-page.component.html",
    styleUrls: ["./acronym-page.component.css"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AcronymPageComponent implements ISubscribe, OnInit, OnDestroy {
    acronymResult: Observable<Acronym>;
    projects: Observable<Projects>;
    authUser: Observable<User>;

    _acronym$: SubscriptionLike;
    acronymResultState: Acronym;

    constructor(public store: Store<AppState>) {
        this.acronymResult = this.store.pipe(select(state => state.acronym));
        this.projects = this.store.pipe(select(state => state.projects));
        this.authUser = this.store.pipe(select(state => state.authUser))
        this.setupSubscriptions();
        this.acronymResultState = {code: "", project: ""};
    }

    ngOnInit() {
        this.store.dispatch(new ProjectActions.LoadProjects([]));
    }

    setupSubscriptions() {
        this._acronym$ = this.acronymResult.subscribe(data => {
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
        this._acronym$.unsubscribe();
    }
}
