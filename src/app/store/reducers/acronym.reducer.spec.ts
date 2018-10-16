import * as acronymReducer from "./acronym.reducer";
import * as fromAction from "../actions/acronym.actions";

describe("AcronymReducer", () => {
    it("should return the default state", () => {
        const {initialState} = acronymReducer;
        const action = {} as any;
        const state = acronymReducer.acronymReducer(undefined, action);

        expect(state).toBe(initialState);
    });

    it("should return correct state with SearchAcronym action", () => {
        const {initialState} = acronymReducer;
        const action = new fromAction.SearchAcronym({code: ""});
        const state = acronymReducer.acronymReducer(initialState, action);

        expect(state.acronym).toBeNull();
        expect(state.loaded).toBe(false);
        expect(state.loading).toBe(true);
    });

    it("should return correct state with SearchAcronymSuccess action", () => {
        const acronym = {code: "SAM", id: "234trewr3", meaning: "Means the world", description: "La de dah"};
        const {initialState} = acronymReducer;
        const action = new fromAction.SearchAcronymSuccess(acronym);
        const state = acronymReducer.acronymReducer(initialState, action);

        expect(state.acronym).toEqual(acronym);
        expect(state.loaded).toBe(true);
        expect(state.loading).toBe(false);
    });

    it("should return correct state with SearchAcronymFail action", () => {
        const {initialState} = acronymReducer;
        const action = new fromAction.SearchAcronymFail(new Error());
        const state = acronymReducer.acronymReducer(initialState, action);

        expect(state.acronym).toBeNull();
        expect(state.loaded).toBe(true);
        expect(state.loading).toBe(false);
    });

    it("should return correct state with SaveAcronym action", () => {
        const {initialState} = acronymReducer;
        const action = new fromAction.SaveAcronym({code: ""});
        const state = acronymReducer.acronymReducer(initialState, action);

        expect(state.acronym).toBeNull();
        expect(state.loaded).toBe(false);
        expect(state.loading).toBe(true);
    });

    it("should return correct state with SaveAcronymSuccess action", () => {
        const acronym = {code: "SAM", id: "234trewr3", meaning: "Strength Abs Master", description: "La de dah"};
        const {initialState} = acronymReducer;
        const action = new fromAction.SaveAcronymSuccess(acronym);
        const state = acronymReducer.acronymReducer(initialState, action);

        expect(state.acronym).toEqual(acronym);
        expect(state.loaded).toBe(true);
        expect(state.loading).toBe(false);
    });

    it("should return correct state with SaveAcronymFail action", () => {
        const {initialState} = acronymReducer;
        const action = new fromAction.SaveAcronymFail(new Error());
        const state = acronymReducer.acronymReducer(initialState, action);

        expect(state.acronym).toBeNull();
        expect(state.loaded).toBe(true);
        expect(state.loading).toBe(false);
    });
});
