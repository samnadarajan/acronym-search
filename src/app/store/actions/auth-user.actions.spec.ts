import * as fromActions from "@app/store/actions/auth-user.actions";

describe("Auth User Actions", () => {
    it("should create the Login action", () => {
        const user = {uid: "2sdfafe32", displayName: "Sam Nadarajan", email: "test@test.com"};

        const action = new fromActions.Login(user);

        expect(action.type).toEqual(fromActions.LOGIN_USER);
        expect(action.payload).toEqual(user);
    });

    it("should create the Logout action", () => {
        const action = new fromActions.Logout();

        expect(action.type).toEqual(fromActions.LOGOUT_USER);
    });
});
