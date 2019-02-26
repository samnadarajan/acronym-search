import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";

import {AppComponent} from "./app.component";
import {environment} from "../environments/environment";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "./material/material.module";
import {AngularFireModule} from "@angular/fire";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {AngularFireStorageModule} from "@angular/fire/storage";
import {RouterModule, Routes} from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { AcronymPageComponent } from "./components/acronym-page/acronym-page.component";
import {AuthGuard} from "./modules/auth/guards/auth/auth.guard";
import {AuthModule} from "./modules/auth/auth.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {EffectsModule} from "@ngrx/effects";
import {reducers, effects} from "./store";
import {UppercaseDirective} from "@app/directives/uppercase.directive";
import {StoreModule} from "@ngrx/store";
import {NgxMaskModule} from "ngx-mask";
import {FirebaseUIModule, firebase, firebaseui} from "firebaseui-angular";
import { ProjectsPageComponent } from "./modules/projects/components/projects-page/projects-page.component";
import {ProjectsModule} from "@app/modules/projects/projects.module";
import {AcronymsModule} from "@app/modules/acronyms/acronyms.module";
import {AngularFireFunctionsModule, FunctionsRegionToken} from "@angular/fire/functions";

const firebaseUiAuthConfig: firebaseui.auth.Config = {
    signInFlow: "popup",
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM
};

const ROUTES: Routes = [
    {path: "acronym", component: AcronymPageComponent, canActivate: [AuthGuard]},
    {path: "projects", component: ProjectsPageComponent},
    {path: "login", component: LoginComponent},
    {path: "", component: LoginComponent}
];

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        UppercaseDirective,
    ],
    imports: [
        AcronymsModule,
        BrowserModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireStorageModule,
        AngularFireFunctionsModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(ROUTES),
        MaterialModule,
        AuthModule,
        FlexLayoutModule,
        ProjectsModule,
        NgxMaskModule.forRoot(),
        StoreModule.forRoot(reducers),
        EffectsModule.forRoot(effects),
        FirebaseUIModule.forRoot(firebaseUiAuthConfig),
    ],
    providers: [
        { provide: FunctionsRegionToken, useValue: "us-central1"}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
