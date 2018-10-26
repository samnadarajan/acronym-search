import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { MismatchDialogComponent } from "./mismatch-dialog.component";
import {MaterialModule} from "@app/material/material.module";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

describe("MismatchDialogComponent", () => {
    let component: MismatchDialogComponent;
    let fixture: ComponentFixture<MismatchDialogComponent>;
    let compiled;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ MismatchDialogComponent ],
            imports: [
                MaterialModule
            ],
            providers: [
                {provide: MatDialogRef, useValue: {close: (dialogResult: any) => { }} },
                {provide: MAT_DIALOG_DATA, useValue: {}}
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MismatchDialogComponent);
        component = fixture.componentInstance;
        compiled = fixture.debugElement.nativeElement
        spyOn(component.continueSave, "emit");
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should emit true when user says the mismatch is intended",() => {
        const buttons = compiled.querySelectorAll("button");
        expect(buttons.length).toEqual(2);

        const allowMismatchButton = buttons[1];
        allowMismatchButton.click();

        fixture.detectChanges();
        expect(component.continueSave.emit).toHaveBeenCalledWith(true);

    });
});
