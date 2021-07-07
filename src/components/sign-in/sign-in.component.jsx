import React from 'react';
import {signInWithGoogle} from '../../utils/firebase.utils'
import {auth} from "../../utils/firebase.utils";

import FormInput from '../form-input/form-input.component';
import CustomButton from "../custom-button/custom-button.component";

import {withFormik} from "formik";
import * as Yup from 'yup'

import './sign-in.style.scss';

const SignIn = (props) => {

    const handleSubmit = async event => {
        event.preventDefault();

        const {email,password} = props.values

        try{
            await auth.signInWithEmailAndPassword(email,password)
        }catch (e) {
            console.log('Error: ',e)
            switch (e.code) {
                case "auth/user-not-found":
                    this.props.errors['email'] = 'Username/email is incorrect'
                    console.log('errors: ',(this.props.errors['email']))
                    break
                case "auth/wrong-password":
                    this.props.errors['password'] = 'Username/email is incorrect'
                    console.log('errorsPassword: ',(this.props.errors['password']))
                    break
                default:
                    this.props.errors['email'] = e.message
                    console.log('errors: ',(this.props.errors['email']))
                    break
            }
        }
    };
    return (
        <div className='sign-in'>
            <h2>SIGN IN</h2>
            <span>Sign in with your email and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput
                    name='email'
                    type='email'
                    handleChange={props.handleChange}
                    value={props.values['email']}
                    label='Email'
                    required
                    onChange={props.handleChange}
                    onBlur = {props.handleBlur}
                    touched = {(props.touched['email'])}
                    errors = {(props.errors['email'])}

                />
                <FormInput
                    name='password'
                    type='password'
                    value={props.values['password']}
                    handleChange={props.handleChange}
                    label='Password'
                    required
                    onChange={props.handleChange}
                    onBlur = {props.handleBlur}
                    touched = {(props.touched['password'])}
                    errors = {(props.errors['password'])}

                />
                <div className='row'>
                    <div className='col-lg-5'>
                        <CustomButton type='submit'> Sign in </CustomButton>
                    </div>
                    <div className='col-lg-7 overflow-hidden'>
                        <CustomButton onClick={signInWithGoogle} type='button' isGoogleSignin> Sign in With Google</CustomButton>
                    </div>
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