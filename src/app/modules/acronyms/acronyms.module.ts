import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {AcronymResultComponent} from "@app/modules/acronyms/components/acronym-result/acronym-result.component";
import {AcronymSearchComponent} from "@app/modules/acronyms/components/search/acronym-search.component";
import {AcronymPageComponent} from "@app/modules/acronyms/components/acronym-page/acronym-page.component";
import {MaterialModule} from "@app/material/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";

@NgModule({
    declarations: [
        AcronymPageComponent,
        AcronymResultComponent,
        AcronymSearchComponent
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
