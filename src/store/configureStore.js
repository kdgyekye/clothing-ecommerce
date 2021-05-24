import {createStore, applyMiddleware} from "redux";
import rootReducer from './reducers/root-reducer'
import logger from 'redux-logger'

const middlewares = [logger]

const store = createStore(rootReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store
