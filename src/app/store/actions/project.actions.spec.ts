import * as fromActions from "./project.actions";

describe("Project Actions", () => {
    it("should create the LoadProjects action", () => {
        const action = new fromActions.LoadProjects([]);

        expect(action.type).toEqual(fromActions.LOAD_PROJECTS);
        expect(action.payload).toEqual([]);
    });

    it("should create the LoadProjectsSuccess action", () => {
        const projects = [{name: "SAM", id: "23ds"}, {name: "ALL", id: "s90e"}];
        const action = new fromActions.LoadProjectsSuccess(projects);

        expect(action.type).toEqual(fromActions.LOAD_PROJECTS_SUCCESS);
        expect(action.payload).toEqual(projects);
    });

    it("should create the LoadProjectsFail action", () => {
        const projects = [{name: "SAM", id: "23ds"}, {name: "ALL", id: "s90e"}];
        const action = new fromActions.LoadProjectsFail(projects);

        expect(action.type).toEqual(fromActions.LOAD_PROJECTS_FAIL);
        expect(action.payload).toEqual(projects);
    });

    it("should create the SelectProject action", () => {
        const project = {name: "ALL", id: "s90e"};
        const action = new fromActions.SelectProject(project);

        expect(action.type).toEqual(fromActions.SELECT_PROJECT);
        expect(action.payload).toEqual(project);
    });
});
