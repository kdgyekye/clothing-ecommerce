import React from "react";

import './header.styles.scss'
import {ReactComponent as Logo} from '../../assets/unicorn.svg'
import {Link} from "react-router-dom";
import {auth} from "../../utils/firebase.utils";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";

//redux imports
import {connect} from "react-redux";
import {selectCartToggle} from "../../store/selectors/cart.selector";
import {selectCurrentUser} from "../../store/selectors/user.selector";

const Header = (props) => (
    <div className='header fixed-top'>
        <div className='d-flex align-items-center justify-content-between'>
            <Link className='logo-container' to={'/'}>
                <img src='favicon.ico' alt='logo' className='logo'/>
            </Link>
            <div className='btn-group options navbar'>
                <Link className= 'option' to='/shop'>SHOP</Link>
                <Link className='option' to='/contact'>CONTACT</Link>
                {
                    props.currentUser?
                        <div className='option' onClick={() => auth.signOut()}>SIGN OUT</div>
                        :
                        <Link className='option' to='/signin'>SIGN IN</Link>
                }
                <CartIcon />

            </div>
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
        currentUser: selectCurrentUser(state),
        cartToggle: selectCartToggle(state)
    }
}

export default connect(mapStateToProps)(Header)