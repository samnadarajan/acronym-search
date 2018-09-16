import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output} from "@angular/core";
import {Acronym} from "../../model/acronym.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AppState} from "../../app.state";
import {Store} from "../../../../node_modules/@ngrx/store";

@Component({
    selector: "app-result",
    templateUrl: "./result.component.html",
    styleUrls: ["./result.component.css"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultComponent implements OnChanges {
    @Input() result: Acronym;
    @Output() saveAcronym = new EventEmitter();

    acronymForm: FormGroup;
    formChanged = false;

    constructor(public formBuilder: FormBuilder) { }

    ngOnChanges() {
        if (this.result) {
            this.acronymForm = this.formBuilder.group({
                meaning: this.result.meaning,
                description: this.result.description,
                id: this.result.id,
                code: this.result.code
            });
            this.onChanges();
        }
    }

    onChanges() {
        this.acronymForm.valueChanges.subscribe(values => {
            if (this.result) {
                if (this.result.meaning !== values.meaning || this.result.description !== values.description) {
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
