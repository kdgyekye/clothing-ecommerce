import React from "react";
import CollectionOverview from "../../components/collection-overview/collection-overview.component";

//redux imports
import {connect} from "react-redux";

const Shop = props => {
        return(
            <div className='shop'>
                <CollectionOverview />
            </div>
        )
}

export default connect()(Shop)