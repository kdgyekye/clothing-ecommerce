import {createSelector} from "reselect";

// const MAP_ID_TO_CATEGORY = {
//     hats: 1,
//     sneakers: 2,
//     jackets: 3,
//     womens: 4,
//     mens: 5
// }

const selectCollectionReducer = state => state.collectionReducer

export const selectCollections = createSelector(
    [selectCollectionReducer],
    collection => collection.shopData
)

export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    collections => Object.keys(collections).map(key => collections[key])
)

export const selectCategories = categoryId => createSelector(
        [selectCollections],
        collectionItems => collectionItems[categoryId]
    )
