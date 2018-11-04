import * as authUserReducer from "./auth-user.reducer";
import * as fromAction from "@app/store/actions/authUser.actions";

describe("AuthUserReducer", () => {
    it("should return the default state", () => {
        const {initialState} = authUserReducer;
        const action = {} as any;
        const state = authUserReducer.authUserReducer(undefined, action);

        expect(state).toBe(initialState);
    });

    it("should return correct state with Login action", () => {
        const {initialState} = authUserReducer;
        const user = {uid: "234r2ewfd", displayName: "Sam Nadarajan", photoURL: "https://t.co/url/photo.png"};
        const action = new fromAction.Login(user);
        const state = authUserReducer.authUserReducer(initialState, action);

        expect(state.user).toEqual(user);
        expect(state.isLoggedIn).toBe(true);
    });

    it("should return correct state with Logout action", () => {
        const {initialState} = authUserReducer;
        const action = new fromAction.Logout();
        const state = authUserReducer.authUserReducer(initialState, action);

        expect(state.user).toEqual({});
        expect(state.isLoggedIn).toBe(false);
    });
});
