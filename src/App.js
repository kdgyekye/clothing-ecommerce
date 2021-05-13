import React from 'react'
import './App.css';

//Library Imports
import {Route} from "react-router-dom";
import {auth} from "./utils/firebase.utils";
//component imports
import Homepage from "./pages/homepage/homepage.component";
//import Hats from "./pages/hats/hats.component";
import Shop from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndOut from "./pages/sign-in-and-up/sign-in-and-up.component";

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentUser: null
        }
    }

    unsubscribeFromAuth = null

    componentDidMount() {
        auth.onAuthStateChanged(user => {
            this.setState({currentUser: user})
            console.log(user)
        })
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth()
    }


    render() {
        return (
            <div className="App">
                <Header currentUser={this.state.currentUser}/>
                <Route exact={true}
                       path='/'
                       component={Homepage}
                />
                <Route exact={true}
                       path='/shop'
                       component={Shop}
                />
                <Route exact={true}
                       path='/signin'
                       component={SignInAndOut}
                />
            </div>
        )
    }


}

export default App;
