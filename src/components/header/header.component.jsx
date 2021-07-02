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
    NavbarText,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';


const Header = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    useEffect(() => {
        main()
    })
    return (
        <div  >
            {/*<nav className='navbar navbar-expand-lg'>*/}
            {/*    <div className='container-fluid'>*/}
            {/*        <div className='logo-container navbar-brand' >*/}
            {/*            <Link to={'/'}><h4>Unicorn Clothing</h4></Link>*/}
            {/*            <span><img src='favicon.ico' alt='logo' className='logo'/></span>*/}
            {/*        </div>*/}
            {/*        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"*/}
            {/*                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"*/}
            {/*                aria-expanded="false" aria-label="Toggle navigation">*/}
            {/*            <span className="navbar-toggler-icon"/>*/}
            {/*        </button>*/}
            {/*        <div className='collapse navbar-collapse options'  id="navbarSupportedContent">*/}
            {/*            <div className='btn-group navbar-nav'>*/}
            {/*                <Link className='option' to='/shop'>SHOP</Link>*/}
            {/*                <Link className='option' to='/contact'>CONTACT</Link>*/}
            {/*                {*/}
            {/*                    props.currentUser ?*/}
            {/*                        <div className='option' onClick={() =>*/}
            {/*                        {*/}
            {/*                            auth.signOut()*/}
            {/*                            props.history.push('/')*/}
            {/*                            props.clearCart()*/}

            {/*                        }*/}
            {/*                        }>SIGN OUT</div>*/}
            {/*                        :*/}
            {/*                        <Link className='option' to='/signin'>SIGN IN</Link>*/}
            {/*                }*/}
            {/*            </div>*/}
            {/*            <CartIcon/>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</nav>*/}
            <Navbar id='header' expand='md' light className='fixed-top'>
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
            {
                props.cartToggle ?
                    null
                    :
                    <CartDropdown/>
            }
            {/*<Navbar color="light" light expand="md">*/}
            {/*    <NavbarBrand href="/">reactstrap</NavbarBrand>*/}
            {/*    <NavbarToggler onClick={toggle} />*/}
            {/*    <Collapse isOpen={isOpen} navbar>*/}
            {/*        <Nav className="mr-auto" navbar>*/}
            {/*            <NavItem>*/}
            {/*                <NavLink href="/components/">Components</NavLink>*/}
            {/*            </NavItem>*/}
            {/*            <NavItem>*/}
            {/*                <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>*/}
            {/*            </NavItem>*/}
            {/*            <UncontrolledDropdown nav inNavbar>*/}
            {/*                <DropdownToggle nav caret>*/}
            {/*                    Options*/}
            {/*                </DropdownToggle>*/}
            {/*                <DropdownMenu right>*/}
            {/*                    <DropdownItem>*/}
            {/*                        Option 1*/}
            {/*                    </DropdownItem>*/}
            {/*                    <DropdownItem>*/}
            {/*                        Option 2*/}
            {/*                    </DropdownItem>*/}
            {/*                    <DropdownItem divider />*/}
            {/*                    <DropdownItem>*/}
            {/*                        Reset*/}
            {/*                    </DropdownItem>*/}
            {/*                </DropdownMenu>*/}
            {/*            </UncontrolledDropdown>*/}
            {/*        </Nav>*/}
            {/*        <NavbarText>Simple Text</NavbarText>*/}
            {/*    </Collapse>*/}
            {/*</Navbar>*/}
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