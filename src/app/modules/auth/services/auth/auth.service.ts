import { Injectable } from "@angular/core";
import {Observable, of} from "rxjs";
import {Router} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {AngularFirestore} from "@angular/fire/firestore";
import {AngularFireAuth} from "@angular/fire/auth";
import {User} from "@app/model/user.model";
import {SearchService} from "@app/services/search/search.service";
import {FirebaseUISignInFailure, FirebaseUISignInSuccessWithAuthResult} from "firebaseui-angular";

@Injectable({
  providedIn: "root"
})
export class AuthService {

    user: Observable<User>;

    constructor(
        private afAuth: AngularFireAuth,
        private searchService: SearchService,
        private afs: AngularFirestore,
        private router: Router) {
        this.user = this.afAuth.authState.pipe(
            switchMap(user => {
                if (user) {
                    return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
                } else {
                    return of(null);
                }
            })
        );
    }

    successCallback(signInSuccessData: FirebaseUISignInSuccessWithAuthResult) {
        this.router.navigate(["/acronym"]);
    }

    errorCallback(errorData: FirebaseUISignInFailure) {
        // TODO fix error callback
        console.log(errorData);
        console.log("error");
    }

    signOut() {
        this.afAuth.auth.signOut().then(() => {
            this.router.navigate(["/"]);
        });
    }

}
