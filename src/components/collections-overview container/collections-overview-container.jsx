import React, {useEffect} from 'react'

import {useQuery, gql} from '@apollo/client'
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
    const {loading,data,error} = useQuery(GET_COLLECTIONS)
    useEffect(() => console.log({error} || {data}))

    if (loading) return <SpinnerLoader />
    return (
        <CollectionOverview collectionItems={data?.collections} />
    )
}

export default CollectionsOverviewContainer