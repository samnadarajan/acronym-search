import {Injectable, NgZone} from "@angular/core";
import {Router} from "@angular/router";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";
import {AngularFireAuth} from "@angular/fire/auth";
import {SearchService} from "@app/services/search/search.service";
import {Store} from "@ngrx/store";
import {AppState} from "@app/store/app.state";
import * as AuthUserActions from "@app/store/actions/auth-user.actions";
import {User} from "@app/model/user.model";
import {auth} from "firebase";
import {FirebaseUISignInFailure, FirebaseUISignInSuccessWithAuthResult} from "firebaseui-angular";

@Injectable({
  providedIn: "root"
})
export class AuthService {
    constructor(
        public store: Store<AppState>,
        private afAuth: AngularFireAuth,
        private searchService: SearchService,
        private afs: AngularFirestore,
        private router: Router,
        private _zone: NgZone) {
        this.afAuth.authState.subscribe(response => {
            if (response) {
                const {uid, email, photoURL, displayName} = response;
                const newUser = {uid, email, photoURL, displayName};
                this.store.dispatch(new AuthUserActions.Login(newUser));
                this.navigate("/acronym");
            } else {
                this.store.dispatch(new AuthUserActions.Logout());
                this.navigate("/login");
            }
        });
    }

    logOut() {
        this.afAuth.auth.signOut().then(() => {
            this.router.navigate(["/login"]);
        });
    }

    navigate(route: string) {
        this._zone.run(() => { // TODO address this properly
            this.router.navigate([route]);
        });
    }

}
