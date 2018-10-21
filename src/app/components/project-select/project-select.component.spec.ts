import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ProjectSelectComponent } from "./project-select.component";
import {MaterialModule} from "../../material/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgSelectModule} from "../../../../node_modules/@ng-select/ng-select";
import {MatSelect, MatSelectChange} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe("ProjectSelectComponent", () => {
    let component: ProjectSelectComponent;
    let fixture: ComponentFixture<ProjectSelectComponent>;
    let compiled;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ProjectSelectComponent
            ],
            imports: [
                MaterialModule,
                FormsModule,
                ReactiveFormsModule,
                BrowserAnimationsModule
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProjectSelectComponent);
        component = fixture.componentInstance;
        compiled = fixture.debugElement.nativeElement;
        fixture.detectChanges();
        spyOn(component.selectedProject, "emit");
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should emit a selected project", () => {
        const event = {source: {} as MatSelect, value: {name: "SAM", id: "234re23"}}
        component.onChange(event);
        expect(component.selectedProject.emit).toHaveBeenCalledWith(event.value);
    });
});
