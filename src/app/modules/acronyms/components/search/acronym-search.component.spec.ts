import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {AcronymSearchComponent} from "./acronym-search.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSelect} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import * as ProjectActions from "../../../../store/actions/project.actions";
import {StoreModule} from "@ngrx/store";
import {MaterialModule} from "../../../../material/material.module";

describe("AcronymSearchComponent", () => {
    let component: AcronymSearchComponent;
    let fixture: ComponentFixture<AcronymSearchComponent>;
    let compiled;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AcronymSearchComponent
            ],
            imports: [
                MaterialModule,
                FormsModule,
                ReactiveFormsModule,
                BrowserAnimationsModule,
                StoreModule.forRoot({})
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AcronymSearchComponent);
        component = fixture.componentInstance;
        compiled = fixture.debugElement.nativeElement;
        fixture.detectChanges();
        spyOn(component.store, "dispatch");
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should dispatch a select project action when selecting a project", () => {
        const event = {source: {} as MatSelect, value: "SAM"};
        component.onChange(event);
        const action = new ProjectActions.SelectProject(event.value);
        expect(component.store.dispatch).toHaveBeenCalledWith(action);
    });
});
