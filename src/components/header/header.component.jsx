import React, {useEffect, useState} from "react";

import './header.styles.scss'
import {main} from "../../assets/main";
import {Link} from "react-router-dom";
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
    NavLink,
} from 'reactstrap';


const Header = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);


    const isScrolled = () => {
        const scrolled = document.querySelector('.header-scrolled')
        console.log(scrolled)
        return scrolled
    }

    useEffect(() => {
        main()
        isScrolled()
    })

    return (
        <div>
            {
            isScrolled()?
                <Navbar id='header' expand='md' dark className='fixed-top'>
                    <NavbarBrand className='brand-container'>
                        <Link to={'/'}><h4>Unicorn Clothing</h4></Link>
                        <span><img src='favicon.ico' alt='logo' className='logo'/></span>
                    </NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <CartIcon className=''/>
                        <Nav className='mr-auto' navbar>
                            <NavItem>
                                <NavLink><Link to='/shop'>SHOP</Link></NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink><Link to='/contact'>CONTACT</Link></NavLink>
                            </NavItem>
                            {
                                props.currentUser ?
                                    <NavItem>
                                        <NavLink><Link onClick={() =>
                                        {
                                            auth.signOut()
                                            props.history.push('/')
                                            props.clearCart()

                                        }
                                        }>SIGN OUT</Link></NavLink>
                                    </NavItem>
                                    :
                                    <NavItem>
                                        <NavLink><Link to='/signin'>SIGN IN</Link></NavLink>
                                    </NavItem>
                            }
                        </Nav>
                    </Collapse>
                </Navbar>
            :
                <Navbar id='header' expand='md' light className='fixed-top'>
                    <NavbarBrand className='brand-container'>
                        <Link to={'/'}><h4>Unicorn Clothing</h4></Link>
                        <span><img src='favicon.ico' alt='logo' className='logo'/></span>
                    </NavbarBrand>
                    <div className='options'>
                        <CartIcon className=''/>
                        <NavbarToggler onClick={toggle} />
                        <Collapse isOpen={isOpen} navbar>
                            <Nav className='mr-auto options' navbar>
                                <NavItem>
                                    <NavLink><Link to='/shop'>SHOP</Link></NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink><Link to='/contact'>CONTACT</Link></NavLink>
                                </NavItem>
                                {
                                    props.currentUser ?
                                        <NavItem>
                                            <NavLink><Link onClick={() =>
                                            {
                                                auth.signOut()
                                                props.history.push('/')
                                                props.clearCart()

                                            }
                                            }>SIGN OUT</Link></NavLink>
                                        </NavItem>
                                        :
                                        <NavItem>
                                            <NavLink><Link to='/signin'>SIGN IN</Link></NavLink>
                                        </NavItem>
                                }
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
            }


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