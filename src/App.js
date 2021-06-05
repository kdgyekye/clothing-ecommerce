import React from 'react'
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


class App extends React.Component {

    unsubscribeFromAuth = null

    componentDidMount() {
        this.unsubscribeFromAuth = auth.onAuthStateChanged(async user => {
            console.log(user)
            if (user) {
                const userRef = await createUserProfileDocument(user)

                userRef?.onSnapshot(snapshot => {
                    this.props.setCurrentUser(
                    {
                            id: snapshot.id,
                                ...snapshot.data()
                        }
                    )
                })
            }
            else {
                this.props.setCurrentUser(user)
            }
        })
    }

    componentWillUnmount() {
        const unsubscribe = this.unsubscribeFromAuth
        unsubscribe()
    }


    render() {
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
                               this.props.currentUser?
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


}
const mapStateToProps = (state) => ({
    currentUser: selectCurrentUser(state)
})
const mapDispatchToProps = dispatch => ({
        setCurrentUser: user => {
            dispatch(setCurrentUser(user))
        }
    }
)
export default connect(mapStateToProps,mapDispatchToProps)(App);
