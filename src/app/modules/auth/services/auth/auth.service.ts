import { Injectable } from "@angular/core";
import {Observable, of} from "rxjs";
import {Router} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";
import {AngularFireAuth} from "@angular/fire/auth";
import {auth} from "firebase";

@Injectable({
  providedIn: "root"
})
export class AuthService {

    user: Observable<User>;

    constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) {
        //// Get auth data, then get firestore user document || null
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

    googleLogin() {
        const provider = new auth.GoogleAuthProvider();
        return this._oAuthLogin(provider);
    }

    private _oAuthLogin(provider) {
        return this.afAuth.auth.signInWithPopup(provider)
            .then((credential) => {
                this.updateUserData(credential.user);
                this.router.navigate(["/acronym"]);
            });
    }

    private updateUserData(user) {
        // Sets user data to firestore on login
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

        const data: User = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL
        };

        return userRef.set(data, { merge: true });

    }


    signOut() {
        this.afAuth.auth.signOut().then(() => {
            this.router.navigate(["/"]);
        });
    }

}
