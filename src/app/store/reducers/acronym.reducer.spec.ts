import * as acronymReducer from "./acronym.reducer";
import * as fromAction from "../actions/acronym.actions";

describe("AcronymReducer", () => {
    describe("undefined action", () => {
        it("should return the default state", () => {
            const {initialState} = acronymReducer;
            const action = {} as any;
            const state = acronymReducer.acronymReducer(undefined, action);

            expect(state).toBe(initialState);
        });
    });
});

describe("Search Acronym Action", () => {
    describe("Search Acronym action", () => {
        it("should set loading to true", () => {
            const {initialState} = acronymReducer;
            const action = new fromAction.SearchAcronym({code: ""});
            const state = acronymReducer.acronymReducer(initialState, action);

            expect(state.acronym).toEqual({code: ""});
            expect(state.loaded).toBe(false);
            expect(state.loading).toBe(true);
        });
    });
});

describe("Save Acronym Action", () => {
    describe("Save Acronym action", () => {
        it("should set loading to true", () => {
            const {initialState} = acronymReducer;
            const action = new fromAction.SaveAcronym({code: ""});
            const state = acronymReducer.acronymReducer(initialState, action);

            expect(state.acronym).toEqual({code: ""});
            expect(state.loaded).toBe(false);
            expect(state.loading).toBe(true);
        });
    });
});

describe("Search Acronym Success Action", () => {
    describe("Search Acronym Success action", () => {
        it("should set payload", () => {
            const acronym = {code: "SAM", id: "234trewr3", meaning: "Means the world", description: "La de dah"}
            const {initialState} = acronymReducer;
            const action = new fromAction.SearchAcronymSuccess(acronym);
            const state = acronymReducer.acronymReducer(initialState, action);

            expect(state.acronym).toEqual(acronym);
            expect(state.loaded).toBe(true);
            expect(state.loading).toBe(false);
        });
    });
});

describe("Save Acronym Success Action", () => {
    describe("Save Acronym Success action", () => {
        it("should set payload", () => {
            const acronym = {code: "SAM", id: "234trewr3", meaning: "Strength Abs Master", description: "La de dah"}
            const {initialState} = acronymReducer;
            const action = new fromAction.SaveAcronymSuccess(acronym);
            const state = acronymReducer.acronymReducer(initialState, action);

            expect(state.acronym).toEqual(acronym);
            expect(state.loaded).toBe(true);
            expect(state.loading).toBe(false);
        });
    });
});


describe("Search Acronym Fail Action", () => {
    describe("Search Acronym Fail action", () => {
        it("should ", () => {
            const acronym = {code: ""}
            const {initialState} = acronymReducer;
            const action = new fromAction.SearchAcronymFail(acronym);
            const state = acronymReducer.acronymReducer(initialState, action);

            expect(state.acronym).toEqual(acronym);
            expect(state.loaded).toBe(true);
            expect(state.loading).toBe(false);
        });
    });
});

describe("Save Acronym Fail Action", () => {
    describe("Save Acronym Fail action", () => {
        it("should set payload", () => {
            const acronym = {code: ""}
            const {initialState} = acronymReducer;
            const action = new fromAction.SaveAcronymFail(acronym);
            const state = acronymReducer.acronymReducer(initialState, action);

            expect(state.acronym).toEqual(acronym);
            expect(state.loaded).toBe(true);
            expect(state.loading).toBe(false);
        });
    });
});
