import React, {useState} from "react";

import './sign-in-and-up.style.scss'
import SignIn from "../../components/sign-in/sign-in.component";
import SignUp from "../../components/sign-up/sign-up.component";
import {Link} from "react-router-dom";
import {Alert} from "reactstrap";

const SignInAndOut = () => {
    const [componentType, setComponentType] = useState(true)
    const [alertState, setAlertState] = useState(false)

    const toggleAlertHidden = () => {
        setAlertState(!alertState)
    }


    const handleComponentChange = (toggle) => {
        setComponentType(toggle)
    }
    return (
        <div className='auth-page'>
            <div className='sign-in-and-up'>
                <div className='logo-container' >
                    <Link to={'/'}><h4>Unicorn Clothing</h4></Link>
                    <span><img src='favicon.ico' alt='logo' className='logo'/></span>
                </div>
                <div className='container'>
                    <div className='item-alert col-sm-3 pt-1'>
                        <Alert isOpen={alertState} toggle={toggleAlertHidden}
                               style={{backgroundColor: '#ec364c', color: 'black', border: 'none'}}
                        >Username and/or password is incorrect</Alert>
                    </div>
                    <div className='mt-5 pt-5'>
                        {componentType?
                            <SignIn toggleComponent={handleComponentChange} toggle = {toggleAlertHidden}/>
                            :
                            <SignUp toggleComponent={handleComponentChange}/>
                        }
                    </div>
                </div>
            </div>
            <div className='image-section'>
                <div className='auth-image' />
            </div>
        </div>
    )
}

export default SignInAndOut