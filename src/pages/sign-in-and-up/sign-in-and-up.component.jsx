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
        <div className='auth-page row'>
            <div className='col-lg-5 col-sm-12'>
                <div className='sign-in-and-up'>
                    <div className='logo-container' >
                        <Link to={'/'}><h4>Unicorn Clothing</h4></Link>
                        <span><img src='favicon.ico' alt='logo' className='logo'/></span>
                    </div>
                    <div className='container'>
                        <div className='col-sm-12'>
                            <div className='mt-5 pt-5'>
                                {componentType?
                                    <SignIn toggleComponent={handleComponentChange}/>
                                    :
                                    <SignUp toggleComponent={handleComponentChange}/>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-lg-7 col-sm-12'>
                <div className='auth-image' />
            </div>
        </div>
    )
}

export default SignInAndOut