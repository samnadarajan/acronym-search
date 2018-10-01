import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ProjectSelectComponent } from "./project-select.component";
import {MaterialModule} from "../../material/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgSelectModule} from "../../../../node_modules/@ng-select/ng-select";

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
                NgSelectModule
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

    it("should have a select", () => {
        expect(compiled.querySelector("ng-select")).toBeTruthy();
    });

    it("should emit a selected project", () => {
        const proj = {name: "SAM", id: "234re23"};
        component.onChange(proj);
        expect(component.selectedProject.emit).toHaveBeenCalledWith(proj);
    });
});
