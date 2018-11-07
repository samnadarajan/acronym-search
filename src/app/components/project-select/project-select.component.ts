import {ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit} from "@angular/core";
import {Observable, SubscriptionLike} from "rxjs";
import {Project} from "@app/model/project.model";
import {FormControl} from "@angular/forms";
import {MatSelectChange} from "@angular/material";
import {select, Store} from "@ngrx/store";
import {AppState} from "@app/store/app.state";
import * as ProjectActions from "@app/store/actions/project.actions";
import {DefaultProject} from "@app/model/default-project.model";
import {map} from "rxjs/operators";
import {ISubscribe} from "@app/interfaces/subscribe.interface";

@Component({
    selector: "app-project-select",
    templateUrl: "./project-select.component.html",
    styleUrls: ["./project-select.component.css"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectSelectComponent implements ISubscribe, OnDestroy {
    @Input() projects: Project[];

    defaultProject$: Observable<DefaultProject>;

    chosenProject = new FormControl("");

    default$: SubscriptionLike;

    constructor(public store: Store<AppState>) {
        this.defaultProject$ = this.store.pipe(select(state => state.projects), map(data => data ? data["default"] : null));
        this.setupSubscriptions();
    }

    setupSubscriptions() {
        this.default$ = this.defaultProject$.subscribe((data: DefaultProject) => {
            if (data && this.chosenProject.value === "") {
                this.dispatchSelectedProject(data.projectName);
                this.chosenProject.setValue(data.projectName);
            }
        });
    }

    ngOnDestroy() {
        this.destroySubscriptions();
    }

    onChange(event: MatSelectChange) {
        this.dispatchSelectedProject(event.value);
    }

    dispatchSelectedProject(projectName: string) {
        this.store.dispatch(new ProjectActions.SelectProject(projectName));
    }

    destroySubscriptions() {
        if (this.default$) {
            this.default$.unsubscribe();
        }
    }
}
