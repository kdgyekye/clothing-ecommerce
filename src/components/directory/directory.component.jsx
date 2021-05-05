import React from 'react'

import './directory.styles.scss'
import directoryData from './directory-data'

//component imports
import MenuItem from "../menu-item/menu-item.component";

class Directory extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            directoryData
        }
    }
    render() {
        return(
            <div className='directory-menu'>
                {
                    this.state.directoryData.map(({...sectionProps},index) => {
                        return(
                            <MenuItem key={index}
                                      {...sectionProps}
                            />
                        )
                    })
                }
            </div>
        )
    }
}
export default Directory