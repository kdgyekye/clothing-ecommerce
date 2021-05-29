import {createSelector} from "reselect";
import {selectCartItems} from "./cart.selector";

const MAP_ID_TO_CATEGORY = {
    hats: 1,
    sneakers: 2,
    jackets: 3,
    womens: 4,
    mens: 5
}

const selectCollection = state => state.collectionReducer

export const selectionCollectionItems = createSelector(
    [selectCollection],
    collection => collection.shopData
)

export const selectCategoryItems = categoryId => createSelector(
    [selectionCollectionItems],
    collectionItems => collectionItems.find(item => item.id === MAP_ID_TO_CATEGORY[categoryId])
)