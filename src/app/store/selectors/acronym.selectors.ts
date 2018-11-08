import {createFeatureSelector, createSelector} from "@ngrx/store";
import * as fromAcronyms from "@app/store/reducers/acronym.reducer";

export const getAcronymState = createFeatureSelector("acronym");

export const getAcronymResult = createSelector(
    getAcronymState,
    fromAcronyms.getAcronym
);

export const getAcronymLoading = createSelector(
    getAcronymState,
    fromAcronyms.getAcronymLoading
);

export const getAcronymLoaded = createSelector(
    getAcronymState,
    fromAcronyms.getAcronymLoaded
);
