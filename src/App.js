import React, {useEffect} from 'react'
import './App.css';

//Library Imports
import {Route, Redirect, Switch} from "react-router-dom";
import {auth, createUserProfileDocument} from "./utils/firebase.utils";
//component imports
import Homepage from "./pages/homepage/homepage.component";
import Shop from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndOut from "./pages/sign-in-and-up/sign-in-and-up.component";
import Checkout from "./pages/checkout/checkout.component";
import ScrollToTop from "./utils/scrollToTop";
import ComponentWrapper from "./components/component-wrapper/component-wrapper";

//redux imports
import {connect} from "react-redux";
import {setCurrentUser} from "./store/actions/user.actions";

//selectors
import {selectCurrentUser} from "./store/selectors/user.selector";
import {selectCollectionsForPreview} from "./store/selectors/collection.selector";


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
