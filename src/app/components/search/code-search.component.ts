import {ChangeDetectionStrategy, Component, EventEmitter, Output} from "@angular/core";
import {FormControl} from "@angular/forms";
import {SearchService} from "@app/services/search/search.service";
import {UpperCasePipe} from "@angular/common";

@Component({
    selector: "app-code-search",
    templateUrl: "./code-search.component.html",
    styleUrls: ["./code-search.component.css"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CodeSearchComponent {
    code = new FormControl("");
    @Output() searchString = new EventEmitter<string>();

    constructor(public searchService: SearchService) { }

    beginSearch(codeString: string) {
        if (codeString.length >= 2) {
            this.searchString.emit(new UpperCasePipe().transform(codeString));
        }
    }

}
