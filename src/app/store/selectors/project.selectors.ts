import {createFeatureSelector, createSelector} from "@ngrx/store";
import * as fromProjects from "@app/store/reducers/project.reducer";

export const getProjectsState = createFeatureSelector("projects");

export const getAllProjects = createSelector(
    getProjectsState,
    fromProjects.getProjectList
);

export const getDefaultProject = createSelector(
    getProjectsState,
    fromProjects.getProjectDefault
);

export const getSelectedProject = createSelector(
    getProjectsState,
    fromProjects.getProjectSelected
);

export const getProjectLoadingState = createSelector(
    getProjectsState,
    fromProjects.getProjectLoaded
);
