import {ChangeDetectionStrategy, Component, EventEmitter, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA} from "@angular/material";

@Component({
    selector: "app-mismatch-dialog",
    templateUrl: "./mismatch-dialog.component.html",
    styleUrls: ["./mismatch-dialog.component.css"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MismatchDialogComponent {
    continueSave = new EventEmitter<boolean>();

    constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}
