import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from "@angular/core";
import {FormControl} from "@angular/forms";
import {SearchService} from "../../services/search/search.service";

@Component({
    selector: "app-search",
    templateUrl: "./search.component.html",
    styleUrls: ["./search.component.css"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent {
    code = new FormControl("");
    @Output() searchString = new EventEmitter<string>();

    constructor(public searchService: SearchService) { }

    beginSearch(codeString: string) {
        if (codeString.length >= 2) {
            this.searchString.emit(codeString);
        }
    }

}
