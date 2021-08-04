import React, {useState} from "react";

import './sign-in-and-up.style.scss'
import SignIn from "../../components/sign-in/sign-in.component";
import SignUp from "../../components/sign-up/sign-up.component";
import {Link} from "react-router-dom";

const SignInAndOut = () => {
    const [componentType, setComponentType] = useState(true)
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
                    <div className='mt-5 pt-5'>
                        {componentType?
                            <SignIn toggleComponent={handleComponentChange}/>
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