import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output} from "@angular/core";
import {Acronym} from "@app/model/acronym.model";
import {AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm} from "@angular/forms";
import {ErrorStateMatcher, MatDialog} from "@angular/material";

@Component({
    selector: "app-result",
    templateUrl: "./result.component.html",
    styleUrls: ["./result.component.css"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultComponent implements OnInit, OnChanges {
    @Input() result: Acronym;
    @Output() saveAcronym = new EventEmitter();

    acronymForm: FormGroup;
    formChanged = false;
    editMode = false;
    continueSave = true;
    showWarning = false;
    showHint = false;
    acronymFromMeaning: string;

    constructor(public formBuilder: FormBuilder, public dialog: MatDialog) { }

    ngOnInit() {
        this.acronymForm = this.formBuilder.group({
            meaning: "",
            description: "",
            id: "",
            code: ""
        });
    }

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
                this.formChanged = (this.result.meaning !== values.meaning || this.result.description !== values.description);
            }
        });
    }

    /**
     * If the acronyms do not match show the warning card to verify this is intended
     * @param {string} meaning
     */
    acronymMismatchWarning(meaning: string) {
        if (meaning) {
            this.acronymFromMeaning = this.parseAcronymMeaning(meaning);

            if (this.result.code !== this.acronymFromMeaning) {
                this.continueSave = false;
                this.showWarning = true;
            } else {
                this.continueSave = true;
                this.showWarning = false;
                this.showHint = false;
            }
        }
    }

    parseAcronymMeaning(meaning: string): string {
        return meaning.replace(/[^A-Z]/g, "");
    }

    /**
     * Allow mismatch of acronym
     * @param {boolean} ignoreMismatch
     */
    acknowledgeWarning(ignoreMismatch: boolean) {
        this.continueSave = ignoreMismatch;
        this.showWarning = false;
        this.showHint = !ignoreMismatch;
    }

    save() {
        if (this.continueSave) {
            this.saveAcronym.emit(this.acronymForm.value);
            this.editMode = false;
            this.formChanged = false;
        }
    }


}
