import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Acronym} from "../../model/acronym.model";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
    selector: "app-result",
    templateUrl: "./result.component.html",
    styleUrls: ["./result.component.css"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultComponent implements OnInit {
    @Input() result: Acronym[];
    @Output() updatedAcronym = new EventEmitter();

    acronymForm: FormGroup;

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.acronymForm = this.formBuilder.group({
            meaning: "",
            description: ""
        });

        this.onChanges();
    }

    onChanges() {
        this.acronymForm.valueChanges.subscribe(values => {
            console.log(values);
        });
    }

}
