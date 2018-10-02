import * as fromActions from "./acronym.actions";

describe("Acronym Actions", () => {
    it("should create the SearchAcronym action", () => {
        const acronym = {code: ""};

        const action = new fromActions.SearchAcronym(acronym);

        expect(action.type).toEqual(fromActions.SEARCH_ACRONYM);
        expect(action.payload).toEqual(acronym);
    });

    it("should create the SearchAcronymSuccess action", () => {
        const acronym = {code: ""};

        const action = new fromActions.SearchAcronymSuccess(acronym);

        expect(action.type).toEqual(fromActions.SEARCH_ACRONYM_SUCCESS);
        expect(action.payload).toEqual(acronym);
    });

    it("should create the SearchAcronymFail action", () => {
        const acronym = {code: ""};

        const action = new fromActions.SearchAcronymFail(acronym);

        expect(action.type).toEqual(fromActions.SEARCH_ACRONYM_FAIL);
        expect(action.payload).toEqual(acronym);
    });

    it("should create the SaveAcronym action", () => {
        const acronym = {code: ""};

        const action = new fromActions.SaveAcronym(acronym);

        expect(action.type).toEqual(fromActions.SAVE_ACRONYM);
        expect(action.payload).toEqual(acronym);
    });

    it("should create the SaveAcronymSuccess action", () => {
        const acronym = {code: ""};

        const action = new fromActions.SaveAcronymSuccess(acronym);

        expect(action.type).toEqual(fromActions.SAVE_ACRONYM_SUCCESS);
        expect(action.payload).toEqual(acronym);
    });

    it("should create the SaveAcronymFail action", () => {
        const acronym = {code: ""};

        const action = new fromActions.SaveAcronymFail(acronym);

        expect(action.type).toEqual(fromActions.SAVE_ACRONYM_FAIL);
        expect(action.payload).toEqual(acronym);
    });
});
