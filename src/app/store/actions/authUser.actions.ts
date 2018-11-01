import {Action} from "@ngrx/store";
import {User} from "@app/model/user.model";

export const LOGIN_USER         = "[USER] Login";
export const LOGOUT_USER        = "[USER] Logout";

export class Login implements Action {
    readonly type = LOGIN_USER;

    constructor(public payload: User) {}
}

export class Logout implements Action {
    readonly type = LOGOUT_USER;

    constructor() {}
}

export type AuthUserActions = Login | Logout;
