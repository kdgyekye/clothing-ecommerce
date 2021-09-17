import React , {Fragment} from "react";

import Typed from "typed.js";

import './landing-slideshow.styles.scss'
import '../../assets/slideshow.css'

const LandingSlideshow = (props) => {

    const el = React.useRef(null);
    // Create reference to store the Typed instance itself
    const typed = React.useRef(null);

    React.useEffect(() => {
        const options = {
            strings: [
                'Welcome To Our Store',
            ],
            typeSpeed: 50,
            backSpeed: 50,
        };

        // elRef refers to the <span> rendered below
        typed.current = new Typed(el.current, options);

        return () => {
            typed.current.destroy();
        }
    }, [])
    return (
        <Fragment>
            <div className='container-fluid'>
                <div className='hero'>
                    <ul className="cb-slideshow">
                        <li><span>Image 01</span></li>
                        <li><span>Image 02</span></li>
                        <li><span>Image 03</span></li>
                        <li><span>Image 04</span></li>
                        <li><span>Image 05</span></li>
                        <li><span>Image 06</span></li>
                        <li><span>Image 07</span></li>
                        <li><span>Image 08</span></li>
                        <li><span>Image 09</span></li>
                        <li><span>Image 10</span></li>
                    </ul>
                    <div className="overlay-itro"/>
                    <div className="hero-content display-table">
                        <div className="table-cell">
                            <div className="container">
                                <h1 className="hero-title mb-4"><span ref={el} /></h1>
                                <button className='btn btn-lg shop-now'>SHOP NOW</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
        )
}

export default LandingSlideshow