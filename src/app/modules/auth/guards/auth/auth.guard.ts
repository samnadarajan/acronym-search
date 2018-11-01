import { Injectable } from "@angular/core";
import {CanActivate, ActivatedRouteSnapshot, Router} from "@angular/router";
import {map, take, tap} from "rxjs/operators";
import {AppState} from "@app/store/app.state";
import {select, Store} from "@ngrx/store";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
    constructor(private store: Store<AppState>, private router: Router) {}

    canActivate(next: ActivatedRouteSnapshot) {
        return this.store.pipe(
            select(state => state.authUser),
            map(user => user),
            take(1),
            map(user => !!user),
            tap(loggedIn => {
                if (!loggedIn) {
                  this.router.navigate(["/login"]);
                }
            })
        );
    }
}
