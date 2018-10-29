import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {ResultComponent} from "./result.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "@app/material/material.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AngularFirestoreModule} from "@angular/fire/firestore";

describe("ResultComponent", () => {
    let component: ResultComponent;
    let fixture: ComponentFixture<ResultComponent>;
    let compiled;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ResultComponent],
            imports: [
                MaterialModule,
                FormsModule,
                ReactiveFormsModule,
                AngularFirestoreModule,
                BrowserAnimationsModule
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ResultComponent);
        component = fixture.componentInstance;
        compiled = fixture.debugElement.nativeElement;
    });

    it("should create the component", () => {
        expect(component).toBeTruthy();
    });

    it("should set the form", () => {
        spyOn(component, "onChanges");
        component.result = {code: "SSN", meaning: "Social Security Number", description: "Unique ID for social security benefits" };

        component.ngOnChanges();

        expect(component.acronymForm.get("meaning").value).toEqual(component.result.meaning);
        expect(component.acronymForm.get("description").value).toEqual(component.result.description);
        expect(component.onChanges).toHaveBeenCalled();
    });

    it("should not set the form when there is no result", () => {
        spyOn(component, "onChanges");

        component.ngOnChanges();

        expect(component.acronymForm).toBeUndefined();
        expect(component.onChanges).not.toHaveBeenCalled();
    });

    it("should switch to edit mode when clicking on an editable field", () => {
        component.result = {code: "SSN", meaning: "Social Security Number", description: "Unique ID for social security benefits" };

        fixture.detectChanges();

        const xeditableSpans = compiled.querySelectorAll(".xeditable");
        expect(xeditableSpans.length).toEqual(2);

        xeditableSpans[0].click();

        fixture.detectChanges();

        component.editMode = true;
        expect(compiled.querySelector(".acronym-form")).toBeTruthy();

    });

    it("should show a form with empty values if an acronym was not found", () => {
        const acronymResult = {code: "ACG", meaning: "", description: ""};
        component.result = acronymResult;
        component.acronymForm = component.formBuilder.group(acronymResult);

        fixture.detectChanges();
        const input = compiled.querySelectorAll("input");
        const textarea = compiled.querySelectorAll("textarea");
        expect(input.length).toEqual(1);
        expect(textarea.length).toEqual(1);
        expect(input.value).toBeUndefined();
        expect(textarea.value).toBeUndefined();
    });

    it("should show an add icon if the acronym is new", () => {
        const acronymResult = {code: "SSN", meaning: "", description: ""};
        component.result = acronymResult;
        component.acronymForm = component.formBuilder.group(acronymResult);

        fixture.detectChanges();

        expect(compiled.querySelector("button mat-icon").innerHTML).toEqual("add");
    });

    it("should show an edit icon if the acronym is not new", () => {
        const acronymResult = {code: "SSN", meaning: "Social Security Number", description: "Note to self"};
        component.result = acronymResult;
        component.acronymForm = component.formBuilder.group(acronymResult);

        fixture.detectChanges();

        expect(compiled.querySelector("button mat-icon").innerHTML).toEqual("save");
    });

    it("should have a maxlength on the meaning input", () => {
        const acronymResult = {code: "ACG", meaning: "", description: ""};
        component.result = acronymResult;
        component.acronymForm = component.formBuilder.group(acronymResult);

        fixture.detectChanges();

        const input = compiled.querySelector("input");
        expect(+input.getAttribute("maxlength")).toEqual(50);
    });

    it("should have a maxlength on the description input", () => {
        const acronymResult = {code: "ACG", meaning: "", description: ""};
        component.result = acronymResult;
        component.acronymForm = component.formBuilder.group(acronymResult);

        fixture.detectChanges();

        const input = compiled.querySelector("textarea");
        expect(+input.getAttribute("maxlength")).toEqual(200);
    });

    it("should show a warning if the acronyms do not match", () => {
        const acronym = {code: "SSN", meaning: "Social Security number", description: "Unique ID for social security benefits" };
        component.acronymForm = component.formBuilder.group(acronym);
        component.result = acronym;

        component.acronymMismatchWarning(acronym.meaning);
        fixture.detectChanges();

        expect(component.showWarning).toEqual(true);
        expect(compiled.querySelector(".hint")).toBeFalsy();
    });

    it("should show the hint if user wants to go back and edit the meaning of the acronym", () => {
        const acronym = {code: "SSN", meaning: "Social Security number", description: "Unique ID for social security benefits" };
        spyOn(component, "acknowledgeWarning").and.callThrough();
        component.acronymForm = component.formBuilder.group(acronym);
        component.result = acronym;
        component.editMode = true;

        component.acronymMismatchWarning(acronym.meaning);
        fixture.detectChanges();

        const fixMismatchButton = compiled.querySelector(".fix-mismatch");
        fixMismatchButton.click();

        fixture.detectChanges();

        expect(component.acknowledgeWarning).toHaveBeenCalledWith(false);
        expect(component.showHint).toEqual(true);
        expect(component.continueSave).toEqual(false);
        expect(compiled.querySelector(".hint")).toBeTruthy();
    });

    it("should hide the warning and enable the save button if user ignores the mismatch", () => {
        const acronym = {code: "SSN", meaning: "Social Security number", description: "Unique ID for social security benefits" };
        spyOn(component, "acknowledgeWarning").and.callThrough();
        component.acronymForm = component.formBuilder.group(acronym);
        component.result = acronym;
        component.editMode = true;

        component.acronymMismatchWarning(acronym.meaning);
        fixture.detectChanges();

        const ignoreMismatchButton = compiled.querySelector(".ignore-mismatch");
        ignoreMismatchButton.click();

        fixture.detectChanges();

        expect(component.acknowledgeWarning).toHaveBeenCalledWith(true);
        expect(component.showHint).toEqual(false);
        expect(component.continueSave).toEqual(true);
        expect(compiled.querySelector(".hint")).toBeFalsy();
    });

    it("should set properties if the acronyms potentially mismatch", () => {
        const acronym = {code: "SSN", meaning: "Social Security number", description: "Unique ID for social security benefits"};
        component.result = acronym;

        component.acronymMismatchWarning(acronym.meaning);

        fixture.detectChanges();

        expect(component.continueSave).toEqual(false);
        expect(component.showWarning).toEqual(true);
    });


    it("should set properties if the acronyms match", () => {
        const acronym = {code: "SSN", meaning: "Social Security Number", description: "Unique ID for social security benefits"};
        component.result = acronym;

        component.acronymMismatchWarning(acronym.meaning);

        fixture.detectChanges();

        expect(component.continueSave).toEqual(true);
        expect(component.showWarning).toEqual(false);
    });

    it("should parse the meaning into an acronym by extracting all capital letters", () => {
        let fromMeaning = component.parseAcronymMeaning("Social Security number Flag");
        expect(fromMeaning).toEqual("SSF");

        fromMeaning = component.parseAcronymMeaning("State Verification Exchange System");
        expect(fromMeaning).toEqual("SVES");

        fromMeaning = component.parseAcronymMeaning("help me live another day");
        expect(fromMeaning).toEqual("");
    });

    it("should disable the action button if there were no form changes", () => {
        spyOn(component, "onChanges").and.callThrough();
        const acronymResult = {code: "SSN", meaning: "Social Security Number", description: "Unique ID for social security benefits" };
        component.result = acronymResult;
        component.acronymForm = component.formBuilder.group(acronymResult);

        fixture.detectChanges();
        component.onChanges();
        expect(component.formChanged).toEqual(false);
        expect(compiled.querySelector("button.mat-fab.mat-basic").disabled).toEqual(true);
    });

    it("should enable the action button if there were form changes", () => {
        spyOn(component, "onChanges").and.callThrough();
        const acronymResult = {code: "SSN", meaning: "Social Security Number", description: "Unique ID for social security benefits" };
        component.result = acronymResult;
        component.acronymForm = component.formBuilder.group(acronymResult);

        component.onChanges();

        component.acronymForm.controls["description"].setValue("Bob");
        fixture.detectChanges();

        expect(component.formChanged).toEqual(true);
        expect(compiled.querySelector("button").disabled).toEqual(false);
    });

    it("should save the acronym", () => {
        spyOn(component.saveAcronym, "emit");
        const defaults = {meaning: "test", description: "hello", id: 132424, code: "HEL"};
        component.acronymForm = component.formBuilder.group(defaults);

        component.save();

        expect(component.saveAcronym.emit).toHaveBeenCalledWith(defaults);
    });

    it("should not save the acronym if continueSave is false", () => {
        spyOn(component.saveAcronym, "emit");
        component.continueSave = false;
        const defaults = {meaning: "test", description: "hello", id: 132424, code: "HEL"};
        component.acronymForm = component.formBuilder.group(defaults);

        component.save();

        expect(component.saveAcronym.emit).not.toHaveBeenCalledWith(defaults);
    });
});
