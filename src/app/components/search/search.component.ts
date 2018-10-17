import {ChangeDetectionStrategy, Component, EventEmitter, Output} from "@angular/core";
import {FormControl} from "@angular/forms";
import {SearchService} from "../../services/search/search.service";
import {UpperCasePipe} from "@angular/common";

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
            this.searchString.emit(new UpperCasePipe().transform(codeString));
        }
    }

}
