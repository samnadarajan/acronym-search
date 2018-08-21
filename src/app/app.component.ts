import {Component} from "@angular/core";
import {SearchService} from "./services/search.service";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent {
    title = "Acronym Search";

    constructor(public searchService: SearchService) {}

    beginSearch(searchString: string) {
        this.searchService.search(searchString);
    }

}
