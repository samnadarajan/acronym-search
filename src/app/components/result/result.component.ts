import {AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output} from "@angular/core";
import {Acronym} from "../../model/acronym.model";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
    selector: "app-result",
    templateUrl: "./result.component.html",
    styleUrls: ["./result.component.css"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultComponent implements OnChanges {
    @Input() result: Acronym[];
    @Output() updatedAcronym = new EventEmitter();

    acronymForm: FormGroup;

    constructor(private formBuilder: FormBuilder) { }

    ngOnChanges() {
        if (this.result && this.result.length > 0) {
            this.acronymForm = this.formBuilder.group({
                meaning: this.result[0].meaning,
                description: this.result[0].description
            });
            this.onChanges();
        }
    }

    onChanges() {
        this.acronymForm.valueChanges.subscribe(values => {
            console.log(values);
        });
    }

}
