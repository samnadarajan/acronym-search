import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output} from "@angular/core";
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
    @Output() saveAcronym = new EventEmitter();

    acronymForm: FormGroup;
    formChanged = false;

    constructor(public formBuilder: FormBuilder) { }

    ngOnChanges() {
        if (this.result && this.result.length > 0) {
            this.acronymForm = this.formBuilder.group({
                meaning: this.result[0].meaning,
                description: this.result[0].description,
                id: this.result[0].id,
                code: this.result[0].code
            });
            this.onChanges();
        }
    }

    onChanges() {
        this.acronymForm.valueChanges.subscribe(values => {
            if (this.result && this.result.length > 0) {
                if (this.result[0].meaning !== values.meaning || this.result[0].description !== values.description) {
                    this.formChanged = true;
                } else {
                    this.formChanged = false;
                }

            }
        });
    }

    save() {
        this.saveAcronym.emit(this.acronymForm.value);
    }

}
