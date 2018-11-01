import * as AuthUserActions from "../actions/authUser.actions";
import {User} from "@app/model/user.model";

export interface AuthUserState {
    user: User;
    isLoggedIn: boolean;
}

export const initialState = {
    user: {},
    isLoggedIn: false
};

export function authUserReducer(state = initialState, action: AuthUserActions.AuthUserActions) {
    switch (action.type) {
        case AuthUserActions.LOGIN_USER:
            return {...state, user: action.payload, isLoggedIn: true};
        case AuthUserActions.LOGOUT_USER:
            return {...state, user: {}, isLoggedIn: false};
        default:
            return state;
    }
}
