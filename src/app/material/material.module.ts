import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from "@angular/material";

const modules = [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
];

@NgModule({
    imports: [...modules],
    exports: [...modules],
    declarations: []
})
export class MaterialModule { }
