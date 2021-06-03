import React, {useEffect} from "react";

import './header.styles.scss'
import {main} from "../../assets/main";
import {Link} from "react-router-dom";
import {auth} from "../../utils/firebase.utils";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";

//redux imports
import {connect} from "react-redux";
import {selectCartToggle} from "../../store/selectors/cart.selector";
import {selectCurrentUser} from "../../store/selectors/user.selector";

const Header = (props) => {
    useEffect(() => {
        main()
    })
    return (
        <div id='header' className='fixed-top'>
            <div className='d-flex align-items-center justify-content-between'>
                <div className='logo-container' >
                    <Link to={'/'}><h4>Unicorn Clothing</h4></Link>
                    <span><img src='favicon.ico' alt='logo' className='logo'/></span>
                </div>
                <div className='btn-group options navbar'>
                    <Link className='option' to='/shop'>SHOP</Link>
                    <Link className='option' to='/contact'>CONTACT</Link>
                    {
                        props.currentUser ?
                            <div className='option' onClick={() => auth.signOut()}>SIGN OUT</div>
                            :
                            <Link className='option' to='/signin'>SIGN IN</Link>
                    }
                    <CartIcon/>

                </div>
            </div>
            {
                props.cartToggle ?
                    null
                    :
                    <CartDropdown/>
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        currentUser: selectCurrentUser(state),
        cartToggle: selectCartToggle(state)
    }
}

export default connect(mapStateToProps)(Header)