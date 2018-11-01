import * as authUserReducer from "./auth-user.reducer";

describe("AuthUserReducer", () => {
    it("should return the default state", () => {
        const {initialState} = authUserReducer;
        const action = {} as any;
        const state = authUserReducer.authUserReducer(undefined, action);

        expect(state).toBe(initialState);
    });
})
