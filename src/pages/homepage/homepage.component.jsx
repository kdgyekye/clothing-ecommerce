import React, {useEffect} from 'react'

import './homepage.style.scss'

//component imports
import Directory from "../../components/directory/directory.component";

const Homepage = () => {
    useEffect(() => {
        document.title = 'Unicorn Clothing'
    })
    return(
        <div className='homepage'>
            <Directory />
        </div>
    )
}
export default Homepage