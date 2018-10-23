import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from "@angular/core";
import {AppState} from "../../store/app.state";
import {Store, select} from "../../../../node_modules/@ngrx/store";
import {Acronym} from "../../model/acronym.model";
import {Observable, of} from "rxjs";
import {Project} from "../../model/project.model";
import {Projects} from "../../model/projects.model";
import * as AcronymActions from "../../store/actions/acronym.actions";
import * as ProjectActions from "../../store/actions/project.actions";
import {ISubscribe} from "@app/interfaces/subscribe.interface";
import {ISubscription} from "rxjs-compat/Subscription";


@Component({
    selector: "app-acronym",
    templateUrl: "./acronym.component.html",
    styleUrls: ["./acronym.component.css"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AcronymComponent implements ISubscribe, OnInit, OnDestroy {
    acronymResult: Observable<Acronym>;
    projects: Observable<Projects>;

    _acronym$: ISubscription;
    acronymResultState: Acronym;

    constructor(public store: Store<AppState>) {
        this.acronymResult = this.store.pipe(select(state => state.acronym));
        this.projects = this.store.pipe(select(state => state.projects));
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
