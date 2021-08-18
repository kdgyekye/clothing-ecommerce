import React, {useEffect, useState} from "react";

import './header.styles.scss'
import {main} from "../../assets/main";
import {Link, useLocation} from "react-router-dom";
import {auth} from "../../utils/firebase.utils";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";

import {withRouter} from "react-router-dom";
//redux imports
import {connect} from "react-redux";
import {selectCartToggle} from "../../store/selectors/cart.selector";
import {selectCurrentUser} from "../../store/selectors/user.selector";
import {clearAllFromCart} from "../../store/actions/cart-actions";

//reactstrap nav
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';


const Header = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);


    // const isScrolled = () => {
    //     const scrolled = document.querySelector('.header-scrolled')
    //     console.log(scrolled)
    //     return scrolled
    // }

    useEffect(() => {
        main()
    },[])

    return (
        <div>
            <Navbar id='header' expand='md' light className='fixed-top'>
                <NavbarBrand className={`brand-container`}>
                    <Link to={'/'}><h4>Unicorn Clothing</h4></Link>
                    <span><img src='favicon.ico' alt='logo' className='logo'/></span>
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar className='nav-links'>
                    <Nav className='mr-auto' navbar>
                        <div onClick={toggle}>
                            <CartIcon className=''/>
                        </div>
                        <NavItem>
                            <NavLink onClick={toggle} className={`${'/shop' === useLocation().pathname?'active' : ''}`}><Link to='/shop'>SHOP</Link></NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink onClick={toggle} className={`${'/contact' === useLocation().pathname?'active' : ''}`}><Link to='/contact'>CONTACT</Link></NavLink>
                        </NavItem>
                        {
                            props.currentUser ?
                                <NavItem>
                                    <NavLink onClick={toggle}><Link onClick={() =>
                                    {
                                        auth.signOut()
                                        props.history.push('/')
                                        props.clearCart()

                                    }
                                    }>SIGN OUT</Link></NavLink>
                                </NavItem>
                                :
                                <NavItem>
                                    <NavLink onClick={toggle}><Link to='/signin'>SIGN IN</Link></NavLink>
                                </NavItem>
                        }
                    </Nav>
                </Collapse>
            </Navbar>

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

const mapDispatchToProps = dispatch => {
    return {
        clearCart: () => dispatch(clearAllFromCart())
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Header))