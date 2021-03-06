import React, {useEffect, useState, Fragment} from "react";

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
import {toggleCart} from "../../store/actions/cart-actions";

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

    const shopRoute = props.history.location.pathname.split('/')
    const isShopRoute = shopRoute.includes('shop')

    // const isScrolled = () => {
    //     const scrolled = document.querySelector('.header-scrolled')
    //     console.log(scrolled)
    //     return scrolled
    // }

    useEffect(() => {
        main()
    },[])

    return (
        <Fragment>
            <Navbar id='header' expand='md' light className='fixed-top align-items-baseline pt-2'>
                <div style={{width: '84%'}} className='d-flex flex-row justify-content-between'>
                    <NavbarBrand className={`brand-container`}>
                        <Link to={'/'}><h4>Unicorn Clothing</h4></Link>
                        <span><img src='favicon.ico' alt='logo' className='logo'/></span>
                    </NavbarBrand>
                    <div onClick={toggleCart}>
                        <CartIcon className=''/>
                    </div>
                </div>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar className='nav-links'>
                    <Nav className='mr-auto' navbar>
                        <NavItem>
                            <NavLink onClick={toggle} className={`navigation ${isShopRoute?'active' : ''}`}><Link to='/shop'>SHOP</Link></NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink onClick={toggle} className={`navigation ${'/contact' === useLocation().pathname?'active' : ''}`}><Link to='/contact'>CONTACT</Link></NavLink>
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
                                    } to={undefined}>SIGN OUT</Link></NavLink>
                                </NavItem>
                                :
                                <NavItem>
                                    <NavLink onClick={toggle} className='navigation'><Link to='/signin'>SIGN IN</Link></NavLink>
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
        </Fragment>
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
        clearCart: () => dispatch(clearAllFromCart()),
        toggleCart: () => dispatch(toggleCart())
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Header))