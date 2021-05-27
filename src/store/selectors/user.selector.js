import {createSelector} from "reselect";

const selectUsers = state => state.userReducer

export const selectCurrentUser = createSelector(
    [selectUsers],
    user => user.currentUser
)

