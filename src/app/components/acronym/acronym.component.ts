import { Component } from "@angular/core";
import {SearchService} from "../../services/search/search.service";

@Component({
  selector: "app-acronym",
  templateUrl: "./acronym.component.html",
  styleUrls: ["./acronym.component.css"]
})
export class AcronymComponent {
    title = "Acronym Search";

    constructor(public searchService: SearchService) {}

    beginSearch(searchString: string) {
        this.searchService.search(searchString);
    }
}
