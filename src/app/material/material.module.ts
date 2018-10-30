import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
    MatButtonModule, MatCardModule, MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule, MatProgressSpinnerModule, MatSelectModule, MatSidenavModule
} from "@angular/material";

const modules = [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSidenavModule
];

@NgModule({
    imports: [...modules],
    exports: [...modules],
    declarations: []
})
export class MaterialModule { }
