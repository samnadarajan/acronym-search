import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {ResultComponent} from "@app/components/result/result.component";
import {SearchComponent} from "@app/components/search/search.component";
import {AcronymPageComponent} from "@app/components/acronym-page/acronym-page.component";
import {MaterialModule} from "@app/material/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";

@NgModule({
    declarations: [
        AcronymPageComponent,
        ResultComponent,
        SearchComponent
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        FormsModule,
        MaterialModule,
        ReactiveFormsModule,
    ]
})
export class AcronymsModule { }
