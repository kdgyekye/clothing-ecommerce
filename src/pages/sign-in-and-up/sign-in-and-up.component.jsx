import React, {Component} from "react";

import './sign-in-and-up.style.scss'
import SignIn from "../../components/sign-in/sign-in.component";
import SignOut from "../../components/sign-up/sign-up.component";

class SignInAndOut extends Component {
    constructor(props) {
        super(props);

        this.state = {
            componentType: true
        }
    }

    handleComponentChange = (toggle) => {
        this.setState({componentType: toggle})
    }
    render() {
        const {componentType} = this.state
        return (
            <div>
                {componentType?
                    <SignIn toggleComponent={this.handleComponentChange}/>
                    :
                    <SignOut toggleComponent={this.handleComponentChange}/>
                }
            </div>
        )
    }
}

export default SignInAndOut