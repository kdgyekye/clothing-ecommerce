import React from 'react'

import {useQuery,gql} from "@apollo/client";

import CategoryPage from "../../pages/category/category.component";
import SpinnerLoader from "../loaders/spinner-loader.component";

const GET_CATEGORY = gql `
    query getCollectionsByTitle($title: String!){
      getCollectionsByTitle(title: $title){
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
`

const CategoryContainer = (props) => {
    console.log('Props: ',props)
    const queryVariable = {"title": `${props.match.params.categoryId}`}
    const {loading, error, data} = useQuery(GET_CATEGORY, {variables: queryVariable})
    console.log(`loading: ${loading}`)
    console.log(`Error: ${error}`)

    return loading?  (<SpinnerLoader />)
    :(
        <CategoryPage category={data?.getCollectionsByTitle} {...props}/>
    )
}

export default CategoryContainer