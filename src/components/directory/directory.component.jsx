import React from 'react'

import './directory.styles.scss'

//redux imports
import {connect} from "react-redux";
import {selectDirectorySections} from "../../store/selectors/directory.selector";

//component imports
import MenuItem from "../menu-item/menu-item.component";

const Directory = (props) => {
    return(
        <div className='container directory'>
           <div className='card'>
               <div className='card-body'>
                   <div className='card-title directory-title'>
                       <h3>CATEGORIES</h3>
                   </div>
                   <hr />
                   <div className='directory-menu'>
                       {
                           props.sections.map(({...sectionProps},index) => {
                               return(
                                   <MenuItem key={index}
                                             {...sectionProps}
                                   />
                               )
                           })
                       }
                   </div>
               </div>
           </div>
        </div>
    )
}

const mapStateToProps = state => ({
    sections: selectDirectorySections(state)
})
export default connect(mapStateToProps)(Directory)