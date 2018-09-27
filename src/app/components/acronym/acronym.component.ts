import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {SearchService} from "../../services/search/search.service";
import {ProjectService} from "../../services/project/project.service";
import {AppState} from "../../store/app.state";
import {Store, select} from "../../../../node_modules/@ngrx/store";
import {Acronym} from "../../model/acronym.model";
import {Observable} from "rxjs";
import {Project} from "../../model/project.model";
import {Projects} from "../../model/projects.model";
import * as AcronymActions from "../../store/actions/acronym.actions";
import * as ProjectActions from "../../store/actions/project.actions";


@Component({
    selector: "app-acronym",
    templateUrl: "./acronym.component.html",
    styleUrls: ["./acronym.component.css"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AcronymComponent implements OnInit {
    acronymResult: Observable<Acronym>;
    projects: Observable<Projects>;

    constructor(public searchService: SearchService, public projectService: ProjectService, public store: Store<AppState>) {
        this.acronymResult = this.store.pipe(select(state => state.acronym));
        this.projects = this.store.pipe(select(state => state.projects));
    }

    ngOnInit() {
        this.store.dispatch(new ProjectActions.LoadProjects([]));
    }

    beginSearch(code: string, project: Project) {
        this.store.dispatch(new AcronymActions.SearchAcronym({code: code, project: project.name}));
    }

    setProject(event: Project) {
        this.store.dispatch(new ProjectActions.SelectProject(event));
    }

    save(acronym: Acronym, project: Project) {
        acronym.project = project.name;
        this.store.dispatch(new AcronymActions.SaveAcronym(acronym));
    }
}
