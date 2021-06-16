import React, {useState,useEffect} from "react";
import CollectionOverview from "../../components/collection-overview/collection-overview.component";
import CategoryPage from "../category/category.component";
import {Route} from "react-router-dom";
import {withRouter} from "react-router-dom";

import {firestore, convertCollectionsSnapshotToObject} from "../../utils/firebase.utils";

//redux imports
import {connect} from "react-redux";
import {fetchCollectionsStartAsync} from "../../store/actions/collection.actions";
import {selectCollectionsFetching} from "../../store/selectors/collection.selector";

import WithSpinner from "../../components/with-spinner/with-spinner.component";

const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview)
const CategoryPageWithSpinner = WithSpinner(CategoryPage)

const Shop = props => {
    const {fetching, updateCollections} = props

    useEffect( () => {
        updateCollections()
    },[])
        return(
            <div className='shop'>
                <Route exact path={`${props.match.path}`} render={(props) => (
                    <CollectionOverviewWithSpinner isLoading={fetching} {...props}/>)} />
                <Route exact path={`${props.match.path}/:categoryId`}  render={(props) => (
                    <CategoryPageWithSpinner isLoading={fetching} {...props}/>)} />
            </div>
        )
}

const mapStateToProps =  state => ({
    fetching: selectCollectionsFetching(state)
})

const mapDispatchToProps =  dispatch => ({
    updateCollections: () => dispatch(fetchCollectionsStartAsync())
})

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Shop))