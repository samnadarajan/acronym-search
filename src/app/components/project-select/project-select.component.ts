import {ChangeDetectionStrategy, Component, Input} from "@angular/core";
import {Observable} from "rxjs";
import {Project} from "@app/model/project.model";
import {FormControl} from "@angular/forms";
import {MatSelectChange} from "@angular/material";
import {Store} from "@ngrx/store";
import {AppState} from "@app/store/app.state";
import * as ProjectActions from "@app/store/actions/project.actions";

@Component({
    selector: "app-project-select",
    templateUrl: "./project-select.component.html",
    styleUrls: ["./project-select.component.css"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectSelectComponent {
    @Input() projects: Observable<Project[]>;

    chosenProject = new FormControl("");

    constructor(public store: Store<AppState>) {}

    onChange(event: MatSelectChange) {
        this.store.dispatch(new ProjectActions.SelectProject(event.value));
    }
}
