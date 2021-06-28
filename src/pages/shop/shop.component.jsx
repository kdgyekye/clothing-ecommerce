import React, {useState,useEffect} from "react";
import CollectionOverview from "../../components/collection-overview/collection-overview.component";
import CategoryPage from "../category/category.component";
import {Route} from "react-router-dom";
import {withRouter} from "react-router-dom";

//redux imports
import {connect} from "react-redux";
import {fetchCollectionsStartAsync, toggleItemAddedAlert} from "../../store/actions/collection.actions";
import {selectCollectionsFetching, selectCollectionsLoaded, selectItemAddedAlert} from "../../store/selectors/collection.selector";

import WithSpinner from "../../components/with-spinner/with-spinner.component";

import {Alert} from "reactstrap";

import './shop.styles.scss'

const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview)
const CategoryPageWithSpinner = WithSpinner(CategoryPage)

const Shop = props => {
    const {fetching, collectionsLoaded, updateCollections, alertState, alertToggle} = props

    const toggleVisibility = () => alertToggle(false)

    const timeOutAlert = () => {
        if (alertState) {
            console.log('Alert state: ', alertState)
            setTimeout(() => {
                alertToggle(false)
            }, 2000)
        }
    }

    useEffect( () => {
        updateCollections()
    },[])

    useEffect( () => {
        timeOutAlert()
    })
        return(
            <div className='shop'>
                <div className='item-alert fixed-bottom'>
                    <Alert isOpen={alertState} toggle={toggleVisibility}
                           style={{backgroundColor: '#45dc38', color: 'black', border: 'none'}}
                    >Item has been added to cart</Alert>
                </div>
                <Route exact path={`${props.match.path}`} render={(props) => (
                    <CollectionOverviewWithSpinner isLoading={fetching} {...props}/>)} />
                <Route exact path={`${props.match.path}/:categoryId`}  render={(props) => (
                    <CategoryPageWithSpinner isLoading={!collectionsLoaded} {...props}/>)} />
            </div>
        )
}

const mapStateToProps =  state => ({
    fetching: selectCollectionsFetching(state),
    collectionsLoaded: selectCollectionsLoaded(state),
    alertState: selectItemAddedAlert(state)
})

const mapDispatchToProps =  dispatch => ({
    updateCollections: () => dispatch(fetchCollectionsStartAsync()),
    alertToggle: (alertState) => dispatch(toggleItemAddedAlert(alertState))
})

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Shop))