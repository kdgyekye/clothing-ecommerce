import React, {useEffect, useState} from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from "../custom-button/custom-button.component";

import {withFormik} from "formik";
import * as Yup from 'yup'

//firebase imports
import {auth, createUserProfileDocument} from "../../utils/firebase.utils";

import './sign-up.style.scss';

const SignUp = ({values, ...otherProps}) => {

    useEffect(() => {
        document.title = `Sign Up - Unicorn Clothing`
    })

    const [signUpErrors, setSignUpErrors] =  useState({
        displayName: null,
        email: null,
        password: null,
        confirmPassword: null
    })

    useEffect(() => {
        if (values['confirmPassword'] !==  values['password']){
            setSignUpErrors({confirmPassword: 'Passwords do not match'})
        }
        else setSignUpErrors({confirmPassword: null})
    }, [values['confirmPassword']])
    const handleSubmit = async event => {
        event.preventDefault();

        if (signUpErrors.confirmPassword) {
            return
        }
        try {
            const {displayName} = values
            const {user} = await auth.createUserWithEmailAndPassword(values.email, values.password)
            await createUserProfileDocument(user, {displayName})

        } catch (e) {
            console.error('Sign Up Error: ', e)
            switch (e.code) {
                case "auth/email-already-in-use":
                    setSignUpErrors({email: e.message})
                    break
                case "auth/weak-password":
                    setSignUpErrors({password: e.message})
                    break
                default:
                    setSignUpErrors({email: null, password: null, confirmPassword: null, displayName: null})
            }
        }
    }
    return (
        <div className='sign-up'>
            <h2>SIGN UP</h2>
            <span>Sign up to create an account</span>

            <form onSubmit={handleSubmit}>
                <FormInput
                    name='displayName'
                    type='text'
                    handleChange={otherProps.handleChange}
                    value={values['displayName']}
                    label='Username'
                    required
                    onChange={otherProps.handleChange}
                    onBlur={otherProps.handleBlur}
                    touched={(otherProps.touched['displayName'])}
                    errors={(otherProps.errors['displayName'])}
                />
                <FormInput
                    name='email'
                    type='email'
                    handleChange={otherProps.handleChange}
                    value={values['email']}
                    label='Email'
                    required
                    onChange={otherProps.handleChange}
                    onBlur={otherProps.handleBlur}
                    touched={(otherProps.touched['email'])}
                    errors={(otherProps.errors['email']) || signUpErrors.email}
                />
                <FormInput
                    name='password'
                    type='password'
                    value={values['password']}
                    handleChange={otherProps.handleChange}
                    label='Password'
                    required
                    onChange={otherProps.handleChange}
                    onBlur={otherProps.handleBlur}
                    touched={(otherProps.touched['password'])}
                    errors={(otherProps.errors['password']) || signUpErrors.password}
                />
                <FormInput
                    name='confirmPassword'
                    type='password'
                    value={values['confirmPassword']}
                    handleChange={otherProps.handleChange}
                    label='Confirm Password'
                    required
                    onChange={otherProps.handleChange}
                    onBlur={otherProps.handleBlur}
                    touched={(otherProps.touched['confirmPassword'])}
                    errors={(otherProps.errors['confirmPassword'] || signUpErrors.confirmPassword)}
                />
                <CustomButton type='submit' style={{width: '70%', margin: '0 auto'}}> Sign Up </CustomButton>
                <br/>
                <div onClick={e => otherProps.toggleComponent(true)} style={{cursor: 'pointer'}}
                     className='text-decoration-underline sign-in-text'><p>Already have an account? Sign in here</p>
                </div>
            </form>
        </div>
    );

}

export default withFormik({
    mapPropsToValues: () => ({
        email: '',
        password: '',
        confirmPassword: '',
        displayName: ''
    }),
    validationSchema: Yup.object().shape({
        email: Yup.string().email('The email you entered is not valid').required('You need to enter an email address'),
        password: Yup.string().required('You need to enter a password'),
        displayName: Yup.string().required('You need to enter your display name'),
        confirmPassword: Yup.string().required('You need to re-enter your password'),

    })
    }
)(SignUp);