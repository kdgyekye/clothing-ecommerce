import React ,{Fragment} from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router} from "react-router-dom";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import ConfigureStore from './store/configureStore'

//apollo graphql
import {ApolloProvider} from "react-apollo";
import {ApolloClient} from "apollo-boost";
import {InMemoryCache} from 'apollo-cache-inmemory'
import {createHttpLink} from 'apollo-link-http'


const httpLink = createHttpLink({
    uri: 'https://crwn-clothing.com'
})

const cache = new InMemoryCache()

const client = new ApolloClient({
    link: httpLink,
    cache
})
const {store, persistor} = ConfigureStore()

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
        <Provider store={store}>
            <Router>
                <PersistGate persistor={persistor}>
                    <App />
                </PersistGate>
            </Router>
        </Provider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
