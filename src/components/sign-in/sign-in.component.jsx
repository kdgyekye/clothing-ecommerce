import React from 'react';
import {signInWithGoogle} from '../../utils/firebase.utils'
import {auth} from "../../utils/firebase.utils";

import FormInput from '../form-input/form-input.component';
import CustomButton from "../custom-button/custom-button.component";

import {withFormik} from "formik";
import * as Yup from 'yup'

import './sign-in.style.scss';

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        };
    }

    handleSubmit = async event => {
        event.preventDefault();

        const {email,password} = this.props.values

        try{
            await auth.signInWithEmailAndPassword(email,password)
            this.setState({ email: '', password: '' });
        }catch (e) {
            console.log('Error: ',e)
            switch (e.code) {
                case "auth/user-not-found":
                    console.log('errors: ',this.props.errors['email'])
                    this.props.errors['email'] = 'Username/email is incorrect'
                    break
                case "auth/wrong-password":
                    this.props.errors['password'] = 'Username/email is incorrect'
            }
        }
    };

    handleChange = event => {
        const { value, name } = event.target;

        this.setState({ [name]: value });
    };

    clearErrors = () => {
        this.setState({emailError: '', passwordError: ''})
    }
    errorStyle = {
        marginTop: '20px',
        paddingLeft: '20px',
        color: 'red'
    }

    render() {
        return (
            <div className='sign-in'>
                <h2>SIGN IN</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        name='email'
                        type='email'
                        handleChange={this.props.handleChange}
                        value={this.props.values['email']}
                        label='Email'
                        required
                        onChange={this.props.handleChange}
                        onBlur = {this.props.handleBlur}
                        touched = {(this.props.touched['email'])}
                        errors = {(this.props.errors['email'])}

                    />
                    <FormInput
                        name='password'
                        type='password'
                        value={this.props.values['password']}
                        handleChange={this.props.handleChange}
                        label='Password'
                        required
                        onChange={this.props.handleChange}
                        onBlur = {this.props.handleBlur}
                        touched = {(this.props.touched['password'])}
                        errors = {(this.props.errors['password'])}

                    />
                    <div className='row'>
                        <div className='col-lg-5'>
                            <CustomButton type='submit'> Sign in </CustomButton>
                        </div>
                        <div className='col-lg-7'>
                            <CustomButton onClick={signInWithGoogle} type='button' isGoogleSignin> Sign in With Google</CustomButton>
                        </div>
                    </div>
                    <div onClick={e => this.props.toggleComponent(false)} style={{cursor: 'pointer'}} className='text-decoration-underline sign-up-text'><p>Don't have an account, Sign Up here</p></div>
                </form>
            </div>
        );
    }
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