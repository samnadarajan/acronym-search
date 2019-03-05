import {Component, OnDestroy, ViewChild} from "@angular/core";
import {AuthService} from "./modules/auth/services/auth/auth.service";
import {Observable} from "rxjs";
import {User} from "@app/model/user.model";
import {map} from "rxjs/operators";
import {select, Store} from "@ngrx/store";
import {AppState} from "@app/store/app.state";
import {Router} from "@angular/router";
import {MatSidenav} from "@angular/material";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent {
    user$: Observable<User>;
    isLoggedIn$: Observable<boolean>;
    @ViewChild("sideNav") sideNav: MatSidenav;

    constructor(public store: Store<AppState>, public authService: AuthService, private _router: Router) {
        this.user$ = this.store.pipe(select(state => state.authUser), map(data => data ? data["user"] : null));
        this.isLoggedIn$ = this.store.pipe(select(state => state.authUser), map(data => data ? data["isLoggedIn"] : false));
    }

    navigate(routeUrl: string) {
        this.closeSideNav();
        this._router.navigate([routeUrl]);
    }

    logOut() {
        this.closeSideNav();
        this.authService.logOut();
    }

    closeSideNav() {
       return this.sideNav.close();
    }
}
