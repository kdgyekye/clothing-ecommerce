import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from "../custom-button/custom-button.component";

import './sign-up.style.scss';
import {Link} from "react-router-dom";

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            username: ''
        };
    }

    handleSubmit = event => {
        event.preventDefault();

        this.setState({ email: '', password: '', username: '' });
    };

    handleChange = event => {
        const { value, name } = event.target;

        this.setState({ [name]: value });
    };

    render() {
        return (
            <div className='sign-in'>
                <h2>SIGN UP</h2>
                <span>Sign up to create an account</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        name='username'
                        type='text'
                        handleChange={this.handleChange}
                        value={this.state.username}
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
                    <CustomButton type='submit'> Sign Up </CustomButton>
                    <br/>
                    <Link onClick={e => this.props.toggleComponent(true)}><p>Sign In</p></Link>
                </form>
            </div>
        );
    }
}

export default SignIn;