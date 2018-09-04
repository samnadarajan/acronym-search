import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {ResultComponent} from "./result.component";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../material/material.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AngularFirestoreModule} from "angularfire2/firestore";

describe("ResultComponent", () => {
    let component: ResultComponent;
    let fixture: ComponentFixture<ResultComponent>;

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
        fixture.detectChanges();
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
        expect(component).toBeTruthy();
    });
});
