import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {ProjectsPageComponent} from "@app/modules/projects/components/projects-page/projects-page.component";
import {AddProjectDialogComponent} from "@app/modules/projects/components/add-project-dialog/add-project-dialog.component";
import {DeleteProjectDialogComponent} from "@app/modules/projects/components/delete-project-dialog/delete-project-dialog.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "@app/material/material.module";
import {FlexLayoutModule} from "@angular/flex-layout";

@NgModule({
    declarations: [
        AddProjectDialogComponent,
        DeleteProjectDialogComponent,
        ProjectsPageComponent
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        FormsModule,
        MaterialModule,
        ReactiveFormsModule,
    ],
    entryComponents: [
        AddProjectDialogComponent,
        DeleteProjectDialogComponent
    ]
})
export class ProjectsModule { }
