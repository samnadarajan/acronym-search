import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {ResultComponent} from "./result.component";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../material/material.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AngularFirestoreModule} from "angularfire2/firestore";

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

    it("should save the acronym", () => {
        spyOn(component.saveAcronym, "emit");
        const defaults = {meaning: "test", description: "hello", id: 132424, code: "HEL"};
        component.acronymForm = component.formBuilder.group(defaults);

        component.save();

        expect(component.saveAcronym.emit).toHaveBeenCalledWith(defaults);
    });

    it("should set the form", () => {
        spyOn(component, "onChanges");
        component.result = [{code: "SSN", meaning: "Social Security Number", description: "Unique ID for social security benefits" }];

        component.ngOnChanges();

        expect(component.acronymForm.get("meaning").value).toEqual(component.result[0].meaning);
        expect(component.acronymForm.get("description").value).toEqual(component.result[0].description);
        expect(component.onChanges).toHaveBeenCalled();
    });

    it("should not set the form when there is no result", () => {
        spyOn(component, "onChanges");
        component.result = [];

        component.ngOnChanges();

        expect(component.acronymForm).toBeUndefined();
        expect(component.onChanges).not.toHaveBeenCalled();
    });

    it("should disable the action button if there were no form changes", () => {
        spyOn(component, "onChanges").and.callThrough();
        const acronymResult = {code: "SSN", meaning: "Social Security Number", description: "Unique ID for social security benefits" };
        component.result = [acronymResult];
        component.acronymForm = component.formBuilder.group(acronymResult);

        fixture.detectChanges();
        component.onChanges();
        expect(component.formChanged).toEqual(false);
        expect(compiled.querySelector("button.mat-fab.mat-basic").disabled).toEqual(true);
    });
});
