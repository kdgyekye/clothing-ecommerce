import React from "react";

import './header.styles.scss'
import {ReactComponent as Logo} from '../../assets/crown.svg'
import {Link} from "react-router-dom";
import {auth} from "../../utils/firebase.utils";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";

//redux imports
import {connect} from "react-redux";

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
            <CartIcon />

        </div>
        {
            props.cartToggle?
                null
                :
                <CartDropdown/>
        }
    </div>
)

const mapStateToProps = state => {
    return {
        currentUser: state.userReducer.currentUser,
        cartToggle: state.cartReducer.cartHidden
    }
}

export default connect(mapStateToProps)(Header)