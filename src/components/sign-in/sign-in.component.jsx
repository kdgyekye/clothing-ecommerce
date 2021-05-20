import React from 'react';
import {signInWithGoogle} from '../../utils/firebase.utils'
import {auth,createUserProfileDocument} from "../../utils/firebase.utils";

import FormInput from '../form-input/form-input.component';
import CustomButton from "../custom-button/custom-button.component";

//redux import
import {setCurrentUser} from "../../store/actions/user.actions";
import {connect} from "react-redux";

import './sign-in.style.scss';

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };
    }

    handleSubmit = async event => {
        event.preventDefault();

        const {email,password} = this.state

        try{
            const authUser = await auth.signInWithEmailAndPassword(email,password)
            this.setState({ email: '', password: '' });
        }catch (e) {
            console.log('Error: ',e)
        }
    };

    handleChange = event => {
        const { value, name } = event.target;

        this.setState({ [name]: value });
    };

    render() {
        return (
            <div className='sign-in'>
                <h2>SIGN IN</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
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
                    <div className='buttons'>
                        <CustomButton type='submit'> Sign in </CustomButton>
                        <CustomButton onClick={signInWithGoogle} type='button' isGoogleSignin> Sign in With Google</CustomButton>
                    </div>
                    <div onClick={e => this.props.toggleComponent(false)} style={{cursor: 'pointer'}}><p>Sign Up</p></div>
                </form>
            </div>
        );
    }
}

export default SignIn;