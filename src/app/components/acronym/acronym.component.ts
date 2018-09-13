import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {SearchService} from "../../services/search/search.service";
import {ProjectService} from "../../services/project/project.service";

@Component({
    selector: "app-acronym",
    templateUrl: "./acronym.component.html",
    styleUrls: ["./acronym.component.css"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AcronymComponent implements OnInit {
    title = "Acronym Search";

    constructor(public searchService: SearchService, public projectService: ProjectService) {}

    ngOnInit() {
        this.projectService.getProjects();
    }

    beginSearch(searchString: string) {
        this.searchService.search(searchString);
    }
}
