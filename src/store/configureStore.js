import {createStore, applyMiddleware} from "redux";
import rootReducer from './reducers/root-reducer'
import logger from 'redux-logger'

//redux-persist
import {persistStore, persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const middlewares = [logger]

export default () => {
    const store = createStore(persistedReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
    const persistor = persistStore(store)

    return {
        store,
        persistor
    }
}
