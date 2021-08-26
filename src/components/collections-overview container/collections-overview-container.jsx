import React from 'react'

import {Query} from "react-apollo";
import {gql} from 'apollo-boost'
import CollectionOverview from "../collection-overview/collection-overview.component";
import SpinnerLoader from "../loaders/spinner-loader.component";

const GET_COLLECTIONS = gql`
    {
        collections {
            id,
            title,
            items {
                id,
                name,
                price,
                imageUrl
            }
        }
    }
`;

const CollectionsOverviewContainer = () => {
    return (
        <Query query={GET_COLLECTIONS}>
            {
                ({loading, error, data}) => {
                    console.log(loading)
                    console.log({error})
                    console.log({data})

                    if (loading) return <SpinnerLoader />
                    return <CollectionOverview collectionItems={data?.collections}/>
                }
            }
        </Query>
    )
}

export default CollectionsOverviewContainer