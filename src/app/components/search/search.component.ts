import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from "@angular/core";
import {FormControl} from "@angular/forms";
import {SearchService} from "../../services/search.service";
import {Observable} from "rxjs";
import {Acronym} from "../../model/acronym.model";

@Component({
    selector: "app-search",
    templateUrl: "./search.component.html",
    styleUrls: ["./search.component.css"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent {
    code = new FormControl("");
    @Input() list: Observable<Acronym[]>;
    @Output() searchString = new EventEmitter<string>();

    constructor(public searchService: SearchService) { }

    beginSearch(codeString: string) {
        if (codeString.length >= 2) {
            this.searchString.emit(codeString);
        }
    }

}
