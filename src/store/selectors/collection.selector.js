import {createSelector} from "reselect";

const selectCollection = state => state.collectionReducer

export const selectionCollectionItems = createSelector(
    [selectCollection],
    collection => collection.shopData
)