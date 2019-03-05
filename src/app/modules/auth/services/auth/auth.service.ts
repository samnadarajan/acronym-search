import {Injectable, NgZone} from "@angular/core";
import {Router} from "@angular/router";
import {AngularFirestore} from "@angular/fire/firestore";
import {AngularFireAuth} from "@angular/fire/auth";
import {SearchService} from "@app/services/search/search.service";
import {Store} from "@ngrx/store";
import {AppState} from "@app/store/app.state";
import * as AuthUserActions from "@app/store/actions/auth-user.actions";
import * as ProjectActions from "@app/store/actions/project.actions";
import {HttpClient} from "@angular/common/http";
import {fnReturnPattern} from "@app/utils/function-urls";

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
        private _zone: NgZone,
        private http: HttpClient) {

        this.http.get(fnReturnPattern)
            .toPromise()
            .then((result: string[]) => {
                const patterns = result.map(p => RegExp(p["pattern"]));

                this.afAuth.authState.subscribe(response => {
                    if (response) {
                        if (this.isValidEmail(patterns, response.email)) {
                            const {uid, email, photoURL, displayName} = response;
                            const newUser = {uid, email, photoURL, displayName};
                            this.store.dispatch(new AuthUserActions.Login(newUser));
                            this.store.dispatch(new ProjectActions.LoadDefaultProject(uid));
                            this.navigate("/acronym");
                        } else {
                            this.logOut();
                        }
                    }
                });
        });
    }

    logOut() {
        this.afAuth.auth.signOut().then(() => {
            this.store.dispatch(new AuthUserActions.Logout());
            this.router.navigate(["/login"]);
        });
    }

    navigate(route: string) {
        this._zone.run(() => { // TODO address this properly
            this.router.navigate([route]);
        });
    }

    isValidEmail(emailPatterns, email) {
        return emailPatterns.filter(p => p.test(email)).length > 0;
    }

}
