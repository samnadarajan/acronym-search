import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";

import {AppComponent} from "./app.component";
import {AngularFireModule} from "angularfire2";
import {environment} from "../environments/environment";
import {AngularFirestoreModule} from "angularfire2/firestore";
import {AngularFireAuthModule} from "angularfire2/auth";
import {AngularFireStorageModule} from "angularfire2/storage";
import {SearchComponent} from "./components/search/search.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
    declarations: [
        AppComponent,
        SearchComponent
    ],
    imports: [
        BrowserModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule,
        AngularFireStorageModule,
        BrowserAnimationsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
