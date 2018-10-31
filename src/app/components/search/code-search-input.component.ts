import {ChangeDetectionStrategy, Component, EventEmitter, Output} from "@angular/core";
import {FormControl} from "@angular/forms";
import {UpperCasePipe} from "@angular/common";

@Component({
    selector: "app-code-search",
    templateUrl: "./code-search-input.component.html",
    styleUrls: ["./code-search-input.component.css"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CodeSearchInputComponent {
    code = new FormControl("");
    @Output() searchString = new EventEmitter<string>();

    constructor() { }

    beginSearch(codeString: string) {
        if (codeString.length >= 2) {
            this.searchString.emit(new UpperCasePipe().transform(codeString));
        }
    }

}
