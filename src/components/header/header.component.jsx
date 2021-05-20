import React from "react";

import './header.styles.scss'
import {ReactComponent as Logo} from '../../assets/crown.svg'
import {Link} from "react-router-dom";
import {auth} from "../../utils/firebase.utils";

//redux imports
import {connect} from "react-redux";
import {setCurrentUser} from "../../store/actions/user.actions";

const Header = (props) => (
    <div className='header'>
        <Link className='logo-container' to={'/'}>
            <Logo className='logo'/>
        </Link>
        <div className='options'>
            <Link className='option' to='/shop'>SHOP</Link>
            <Link className='option' to='/shop'>CONTACT</Link>
            {
                props.currentUser?
                    <div className='option' onClick={() => auth.signOut()}>SIGN OUT</div>
                :
                    <Link className='option' to='/signin'>SIGN IN</Link>
            }

        </div>
    </div>
)

const mapStateToProps = state => {
    return {
        currentUser: state.user.currentUser
    }
}

export default connect(mapStateToProps)(Header)