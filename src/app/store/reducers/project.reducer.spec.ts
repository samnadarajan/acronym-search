import * as projectReducer from "./project.reducer";
import * as fromActions from "../actions/project.actions";

describe("ProjectReducer", () => {
    it("should return the default state", () => {
        const {initialState} = projectReducer;
        const action = {} as any;
        const state = projectReducer.projectReducer(undefined, action);

        expect(state).toBe(initialState);
    });

    it("should return right state with LoadProjects action", () => {
        const {initialState} = projectReducer;
        const action = new fromActions.LoadProjects([]);
        const state = projectReducer.projectReducer(initialState, action);

        expect(state.list).toEqual([]);
        expect(state.loaded).toBe(false);
        expect(state.selected).toEqual({});
    });

    it("should return right state with LoadProjectsSuccess action", () => {
        const projects = [{name: "SAM", id: "234rtefr"}, {name: "ZOOM", id: "234refwdcvfgtr3"}]
        const {initialState} = projectReducer;
        const action = new fromActions.LoadProjectsSuccess(projects);
        const state = projectReducer.projectReducer(initialState, action);

        expect(state.list).toEqual(projects);
        expect(state.loaded).toBe(true);
        expect(state.selected).toEqual({});
    });

    it("should return right state with LoadProjectsFail action", () => {
        const {initialState} = projectReducer;
        const action = new fromActions.LoadProjectsFail([]);
        const state = projectReducer.projectReducer(initialState, action);

        expect(state.list).toEqual([]);
        expect(state.loaded).toBe(true);
        expect(state.selected).toEqual({});
    });

    it("should return right state with SelectProject action", () => {
        const project = {name: "SAM", id: "234rtefr"}
        const {initialState} = projectReducer;
        const action = new fromActions.SelectProject(project);
        const state = projectReducer.projectReducer(initialState, action);

        expect(state.list).toEqual([]);
        expect(state.loaded).toBe(true);
        expect(state.selected).toEqual(project);
    });

});

