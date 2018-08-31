import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Observable} from "rxjs";
import {Acronym} from "../../model/acronym.model";

@Component({
    selector: "app-result",
    templateUrl: "./result.component.html",
    styleUrls: ["./result.component.css"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultComponent implements OnInit {
    @Input() result: Observable<Acronym[]>
    @Output() updatedAcronym = new EventEmitter();

    constructor() { }

    ngOnInit() {
    }

}
