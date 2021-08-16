import React, {useEffect, useState} from 'react';
import {signInWithGoogle} from '../../utils/firebase.utils'
import {auth} from "../../utils/firebase.utils";

import FormInput from '../form-input/form-input.component';
import CustomButton from "../custom-button/custom-button.component";

import {withFormik} from "formik";
import * as Yup from 'yup'
import {LoadingComponent} from "../../App";

import './sign-in.style.scss';

const SignIn = (props) => {
    const [signInError, setSignInError] = useState('')

    const handleSubmit = async event => {
        event.preventDefault();

        const {email,password} = props.values

        LoadingComponent()

        try{
            await auth.signInWithEmailAndPassword(email,password)
        }catch (e) {
            console.log('Error: ',e)
            switch (e.code) {
                case "auth/user-not-found":
                    props.toggle()
                    console.log('errors: ',signInError)
                    break
                case "auth/wrong-password":
                    props.toggle()
                    console.log('errors: ',signInError)
                    break
                default:
                    props.errors['email'] = e.message
                    console.log('errors: ',(props.errors['email']))
                    break
            }
        }
    };

    useEffect(() => {
        document.title = `Sign In - Unicorn Clothing`
    },[])

    useEffect(() => {
        setSignInError('')
    },[props.values])

    return (
        <div className='sign-in'>
            <h2>SIGN IN</h2>
            <span>Sign in with your email and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput
                    name='email'
                    type='email'
                    value={props.values['email']}
                    label='Email'
                    required
                    onChange={props.handleChange}
                    onBlur = {props.handleBlur}
                    touched = {`${(props.touched['email'])}`}
                    errors = {(props.errors['email']) || signInError}

                />
                <FormInput
                    name='password'
                    type='password'
                    value={props.values['password']}
                    label='Password'
                    required
                    onChange={props.handleChange}
                    onBlur = {props.handleBlur}
                    touched = {`${(props.touched['password'])}`}
                    errors = {(props.errors['password']) || signInError}

                />
                <div className='sign-in-buttons'>
                    <CustomButton type='submit'> Sign in </CustomButton>
                    <CustomButton onClick={signInWithGoogle} type='button' isGoogleSignin><span><svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                      <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                        <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                        <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                        <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                        <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
                      </g>
                    </svg></span>
                    </CustomButton>
                </div>
                <div onClick={e => props.toggleComponent(false)} style={{cursor: 'pointer'}} className='text-decoration-underline sign-up-text'><p>Don't have an account, Sign Up here</p></div>
            </form>
        </div>
    );
}

export default withFormik({
    mapPropsToValues: () => ({
        email: '',
        password: '',
    }),
    validationSchema: Yup.object().shape({
        email: Yup.string().email('Email is invalid').required('Email is required to sign in'),
        password: Yup.string().required('You need to enter your password'),
    }),

})(SignIn);