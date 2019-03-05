import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from "@angular/core";
import {Project} from "../../../../model/project.model";
import {FormControl, FormGroup} from "@angular/forms";
import {Observable, SubscriptionLike} from "rxjs";
import {getDefaultProject} from "../../../../store/selectors/project.selectors";
import {MatSelectChange} from "@angular/material";
import {DefaultProject} from "../../../../model/default-project.model";
import {select, Store} from "@ngrx/store";
import {AppState} from "../../../../store/app.state";
import * as ProjectActions from "../../../../store/actions/project.actions";
import {ISubscribe} from "../../../../interfaces/subscribe.interface";
import {Acronym} from "../../../../model/acronym.model";

@Component({
    selector: "app-search",
    templateUrl: "./acronym-search.component.html",
    styleUrls: ["./acronym-search.component.css"]
})
export class AcronymSearchComponent implements ISubscribe, OnDestroy {
    @Input() projects: Project[];
    @Output() searchString = new EventEmitter<string>();

    defaultProject$: Observable<DefaultProject>;

    searchForm = new FormGroup({
        project: new FormControl(""),
        code: new FormControl("")
    });

    default$: SubscriptionLike;

    constructor(public store: Store<AppState>) {
        this.defaultProject$ = this.store.pipe(select(getDefaultProject));
        this.setupSubscriptions();
    }

    setupSubscriptions() {
        this.default$ = this.defaultProject$.subscribe((data: DefaultProject) => {
            if (data && !this.searchForm.controls["project"].value) {
                this.dispatchSelectedProject(data.projectName);
                this.searchForm.controls["project"].setValue(data.projectName);
            }
        });
    }

    ngOnDestroy() {
        this.destroySubscriptions();
    }

    onChange(event: MatSelectChange) {
        this.dispatchSelectedProject(event.value);
        this.beginSearch(this.searchForm.value);
    }

    dispatchSelectedProject(projectName: string) {
        this.store.dispatch(new ProjectActions.SelectProject(projectName));
    }

    beginSearch(formValues: Acronym) {
        if (formValues.code.length >= 1) {
            this.searchString.emit(this.searchForm.value);
        }
    }

    destroySubscriptions() {
        if (this.default$) {
            this.default$.unsubscribe();
        }
    }
}
