import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from "../custom-button/custom-button.component";

//firebase imports
import {auth, createUserProfileDocument} from "../../utils/firebase.utils";

import './sign-up.style.scss';

class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            displayName: ''
        };
    }

    handleSubmit = async event => {
        event.preventDefault();

        const {email, displayName, password, confirmPassword} = this.state

        if (password !== confirmPassword) {
            alert('Passwords do not match')
            return
        }
        try{
            const {user} = await auth.createUserWithEmailAndPassword(email,password)
            await createUserProfileDocument(user, {displayName})

            this.setState({
                email: '',
                displayName: '',
                password: '',
                confirmPassword: ''
            })
        }catch (e) {
            console.error('Sign Up Error: ',e)
        }
    }

    handleChange = event => {
        const { value, name } = event.target;

        this.setState({ [name]: value });
    };

    render() {
        return (
            <div className='sign-up'>
                <h2>SIGN UP</h2>
                <span>Sign up to create an account</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        name='displayName'
                        type='text'
                        handleChange={this.handleChange}
                        value={this.state.displayName}
                        label='Username'
                        required
                    />
                    <FormInput
                        name='email'
                        type='email'
                        handleChange={this.handleChange}
                        value={this.state.email}
                        label='Email'
                        required
                    />
                    <FormInput
                        name='password'
                        type='password'
                        value={this.state.password}
                        handleChange={this.handleChange}
                        label='Password'
                        required
                    />
                    <FormInput
                        name='confirmPassword'
                        type='password'
                        value={this.state.confirmPassword}
                        handleChange={this.handleChange}
                        label='Confirm Password'
                        required
                    />
                    <CustomButton type='submit'> Sign Up </CustomButton>
                    <br/>
                    <div onClick={e => this.props.toggleComponent(true)} style={{cursor: 'pointer'}} className='text-decoration-underline sign-in-text'><p>Already have an account? Sign in here</p></div>
                </form>
            </div>
        );
    }
}

export default SignUp;