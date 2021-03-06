import React, {useEffect} from "react";
import CollectionOverview from "../../components/collection-overview/collection-overview.component";
import CategoryPage from "../category/category.component";
import {Route} from "react-router-dom";
import {withRouter} from "react-router-dom";

//redux imports
import {connect} from "react-redux";
import {fetchCollectionsStartAsync, toggleItemAddedAlert} from "../../store/actions/collection.actions";
import {selectCollectionsFetching, selectCollectionsLoaded, selectItemAddedAlert} from "../../store/selectors/collection.selector";

import WithSpinner from "../../components/with-spinner/with-spinner.component";

// import CollectionsOverviewContainer
//     from "../../components/collections-overview container/collections-overview-container";
// import CategoryContainer from "../../components/category-container/category-container.component";

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
    },[updateCollections])

    useEffect( () => {
        timeOutAlert()
    },[alertState])
        return(
            <div className='shop'>
                <div className='item-alert fixed-bottom col-sm-3'>
                    <Alert isOpen={alertState} toggle={toggleVisibility}
                           style={{backgroundColor: '#45dc38', color: 'black', border: 'none'}}
                    >Item has been added to cart</Alert>
                </div>
                <Route exact path={`${props.match.path}`} render={(props) => (
                    <CollectionOverviewWithSpinner isLoading={fetching} {...props} />
                    // <CollectionsOverviewContainer/>)}
                    )}/>
                <Route exact path={`${props.match.path}/:categoryId`}  render={(props) => (
                    // <CategoryContainer {...props}/>)} />
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