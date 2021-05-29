import React from "react";
import CollectionOverview from "../../components/collection-overview/collection-overview.component";
import CategoryPage from "../category/category.component";
import {Route} from "react-router-dom";

//redux imports
import {connect} from "react-redux";

const Shop = props => {
        return(
            <div className='shop'>
                <Route exact path={`${props.match.path}`} component={CollectionOverview} />
                <Route exact path={`${props.match.path}/:categoryId`}  component={CategoryPage}/>
            </div>
        )
}

export default connect()(Shop)