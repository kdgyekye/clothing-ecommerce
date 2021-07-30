import {createStore, applyMiddleware} from "redux";
import rootReducer from './reducers/root-reducer'
import logger from 'redux-logger'
import thunk from "redux-thunk";

//redux-persist
import {persistStore, persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cartReducer']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const middlewares = []

if (process.env.NODE_ENV === 'development') {
    middlewares.push(thunk,logger)
}

const storeFunction = () => {
    const store = createStore(persistedReducer, applyMiddleware(...middlewares));
    const persistor = persistStore(store)

    return {
        store,
        persistor
    }
}

export default storeFunction