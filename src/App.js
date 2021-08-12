import React, {useEffect, lazy, Suspense} from 'react'
import './App.css';

//Library Imports
import {Route, Redirect, Switch} from "react-router-dom";
import {auth, createUserProfileDocument} from "./utils/firebase.utils";
import ScrollToTop from "./utils/scrollToTop";

//redux imports
import {connect} from "react-redux";
import {setCurrentUser} from "./store/actions/user.actions";

//selectors
import {selectCurrentUser} from "./store/selectors/user.selector";
import {selectCollectionsForPreview} from "./store/selectors/collection.selector";

import ComponentWrapper from "./components/component-wrapper/component-wrapper";
import SpinnerLoader from "./components/loaders/spinner-loader.component";
import Header from "./components/header/header.component";

//component imports
const Homepage = lazy(() => import("./pages/homepage/homepage.component"));
const Shop = lazy(() => import("./pages/shop/shop.component"));
const  SignInAndOut = lazy(() => import("./pages/sign-in-and-up/sign-in-and-up.component"));
const Checkout = lazy(() => import("./pages/checkout/checkout.component"));

const App = (props) => {

    let unsubscribeFromAuth = null

    useEffect(() => {
        unsubscribeFromAuth = auth.onAuthStateChanged(async user => {
            if (user) {
                const userRef = await createUserProfileDocument(user)

                userRef?.onSnapshot(snapshot => {
                    props.setCurrentUser(
                        {
                            id: snapshot.id,
                            ...snapshot.data()
                        }
                    )
                })
            }
            else {
                props.setCurrentUser(user)
            }
        })

        // addCollectionAndDocuments('shopCollections', this.props.collections.map(({title, items}) => ({
        //     title,
        //      items
        // }))).then(r => console.log(r))

        return function cleanup() {
            const unsubscribe = unsubscribeFromAuth
            console.log(unsubscribe)
            unsubscribe()
        }
    },[])

    return (
        <div className="App">
            <ScrollToTop />
            <Suspense fallback={SpinnerLoader()}>
                <Switch>
                    <Route exact={true}
                           path='/'
                           render={() => {
                               return (
                                   <>
                                       <Header />
                                       <ComponentWrapper>
                                           <Homepage />
                                       </ComponentWrapper>
                                   </>
                               )
                           }}
                    />
                    <Route path='/shop'
                           render={() => {
                               return (
                                   <>
                                       <Header />
                                       <ComponentWrapper>
                                           <Shop />
                                       </ComponentWrapper>
                                   </>
                               )
                           }}
                    />
                    <Route exact={true}
                           path='/checkout'
                           render={() => {
                               return (
                                   <>
                                       <Header />
                                       <ComponentWrapper>
                                           <Checkout />
                                       </ComponentWrapper>
                                   </>
                               )
                           }}
                    />
                    <Route exact={true}
                           path='/signin'
                           render={() =>
                               props.currentUser?
                                   (<Redirect to='/' />)
                                   : (
                                       <SignInAndOut />
                                   )
                           }
                    />
                </Switch>
            </Suspense>
        </div>
    )


}
const mapStateToProps = (state) => ({
    currentUser: selectCurrentUser(state),
    collections: selectCollectionsForPreview(state)
})
const mapDispatchToProps = dispatch => ({
        setCurrentUser: user => {
            dispatch(setCurrentUser(user))
        }
    }
)
export default connect(mapStateToProps,mapDispatchToProps)(App);
