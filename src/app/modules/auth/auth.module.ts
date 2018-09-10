import { NgModule } from "@angular/core";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {AngularFireAuthModule} from "@angular/fire/auth";

@NgModule({
  imports: [
      AngularFireAuthModule,
      AngularFirestoreModule
  ],
  declarations: []
})
export class AuthModule { }
