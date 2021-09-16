import React, {useEffect} from 'react'

import './homepage.style.scss'

//component imports
import Directory from "../../components/directory/directory.component";
import LandingSlideshow from "../../components/landing-slideshow/landing-slideshow.component";

const Homepage = () => {
    useEffect(() => {
        document.title = 'Unicorn Clothing'
    })
    return(
        <div className='homepage'>
            <LandingSlideshow />
            <Directory />
        </div>
    )
}
export default Homepage