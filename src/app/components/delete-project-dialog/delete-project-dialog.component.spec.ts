import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {DeleteProjectDialogComponent} from "./delete-project-dialog.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {StoreModule} from "@ngrx/store";
import {MaterialModule} from "../../material/material.module";
import {MAT_DIALOG_DATA} from "@angular/material";
import * as ProjectActions from "../../store/actions/project.actions";

describe("DeleteProjectDialogComponent", () => {
    let component: DeleteProjectDialogComponent;
    let fixture: ComponentFixture<DeleteProjectDialogComponent>;
    let compiled;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DeleteProjectDialogComponent],
            imports: [
                MaterialModule,
                BrowserAnimationsModule,
                StoreModule.forRoot({})
            ],
            providers: [
                {provide: MAT_DIALOG_DATA, useValue: {name: "Flax", id: "23rtgefer3w"}},
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DeleteProjectDialogComponent);
        component = fixture.componentInstance;
        compiled = fixture.debugElement.nativeElement;
        spyOn(component, "deleteProject").and.callThrough();
        spyOn(component.store, "dispatch");
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should dispatch delete action for deleting a project", async(() => {
        component.deleteProject();
        fixture.detectChanges();

        expect(component.store.dispatch).toHaveBeenCalledWith(new ProjectActions.DeleteProject(component.project.id));
    }));
});
