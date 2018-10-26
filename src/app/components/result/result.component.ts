import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output} from "@angular/core";
import {Acronym} from "@app/model/acronym.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material";
import {MismatchDialogComponent} from "@app/components/mismatch-dialog/mismatch-dialog.component";

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
    dialogRef;
    continueSave = true;

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

    save() {
        if (this.continueSave) {
            this.saveAcronym.emit(this.acronymForm.value);
            this.editMode = false;
            this.formChanged = false;
        }
    }

    acronymMismatchWarning(meaning: string) {
        if (meaning) {
            const acronymFromMeaning = meaning.replace(/[^A-Z]/g, "");

            if (this.result.code !== acronymFromMeaning) {
                this.continueSave = false;

                this.dialogRef = this.dialog.open(MismatchDialogComponent, {
                    data: {acronymFromMeaning: acronymFromMeaning, acronym: this.result.code},
                    disableClose: true,
                    width: "50rem"
                });
                // TODO figure out how to change the disabled state of the button immediately instead of clicking on the form to change it.
                this.dialogRef.componentInstance.continueSave.subscribe((response: boolean) => {
                    this.continueSave = response;
                });

            } else {
                this.continueSave = true;
            }
        }
    }

}
