import {ChangeDetectionStrategy, Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA} from "@angular/material";

@Component({
    selector: "app-mismatch-dialog",
    templateUrl: "./mismatch-dialog.component.html",
    styleUrls: ["./mismatch-dialog.component.css"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MismatchDialogComponent {

    confirmedMismatch = false;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}
