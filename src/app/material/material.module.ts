import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
    MatButtonModule, MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from "@angular/material";

const modules = [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule
];

@NgModule({
    imports: [...modules],
    exports: [...modules],
    declarations: []
})
export class MaterialModule { }
