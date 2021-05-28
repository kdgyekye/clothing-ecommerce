import {combineReducers} from 'redux'

import user from "./user.reducer";
import {cart} from "./cart-reducer";
import directory from './directory-reducer'
import collection from "./collection-reducer";

export default combineReducers({
    userReducer: user,
    cartReducer: cart,
    directoryReducer: directory,
    collectionReducer: collection
})
