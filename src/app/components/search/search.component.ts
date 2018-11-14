import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from "@angular/core";
import {Project} from "@app/model/project.model";
import {FormControl, FormGroup} from "@angular/forms";
import {Observable, SubscriptionLike} from "rxjs";
import {getDefaultProject} from "@app/store/selectors/project.selectors";
import {MatSelectChange} from "@angular/material";
import {DefaultProject} from "@app/model/default-project.model";
import {select, Store} from "@ngrx/store";
import {AppState} from "@app/store/app.state";
import * as ProjectActions from "@app/store/actions/project.actions";
import {ISubscribe} from "@app/interfaces/subscribe.interface";
import {Acronym} from "@app/model/acronym.model";

@Component({
    selector: "app-search",
    templateUrl: "./search.component.html",
    styleUrls: ["./search.component.css"]
})
export class SearchComponent implements ISubscribe, OnDestroy {
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
