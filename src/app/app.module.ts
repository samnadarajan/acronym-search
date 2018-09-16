import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";

import {AppComponent} from "./app.component";
import {environment} from "../environments/environment";
import {SearchComponent} from "./components/search/search.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "./material/material.module";
import { ResultComponent } from "./components/result/result.component";
import {AngularFireModule} from "@angular/fire";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {AngularFireStorageModule} from "@angular/fire/storage";
import {RouterModule, Routes} from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { AcronymComponent } from "./components/acronym/acronym.component";
import {AuthGuard} from "./modules/auth/guards/auth/auth.guard";
import {AuthModule} from "./modules/auth/auth.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import { ProjectSelectComponent } from "./components/project-select/project-select.component";
import { NgSelectModule } from "@ng-select/ng-select";
import {StoreModule} from "../../node_modules/@ngrx/store";
import {acronymReducer} from "./reducers/acronym.reducer";
import {projectReducer} from "./reducers/project.reducer";

const ROUTES: Routes = [
    {path: "acronym", component: AcronymComponent, canActivate: [AuthGuard]},
    {path: "", component: LoginComponent}
];

@NgModule({
    declarations: [
        AppComponent,
        SearchComponent,
        ResultComponent,
        LoginComponent,
        AcronymComponent,
        ProjectSelectComponent
    ],
    imports: [
        BrowserModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireStorageModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(ROUTES),
        MaterialModule,
        AuthModule,
        FlexLayoutModule,
        NgSelectModule,
        StoreModule.forRoot({
            acronym: acronymReducer,
            projects: projectReducer
        })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
