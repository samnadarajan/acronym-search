import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
    MatButtonModule, MatCardModule, MatDialogModule, MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule, MatListModule, MatProgressSpinnerModule, MatSelectModule, MatSidenavModule
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
    MatSidenavModule,
    MatDividerModule,
    MatListModule,
];

@NgModule({
    imports: [...modules],
    exports: [...modules],
    declarations: []
})
export class MaterialModule { }
