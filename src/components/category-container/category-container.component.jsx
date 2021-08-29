import React from 'react'

import {useQuery} from "@apollo/react-hooks";
import {gql} from "apollo-boost";

import CategoryPage from "../../pages/category/category.component";
import SpinnerLoader from "../loaders/spinner-loader.component";

const GET_CATEGORY = gql `
    query getCollectionsByTitle($title: String){
      getCollectionsByTitle(title: $title){
        id,
        title,
        items {
            id,
            name,
            price
        }
      } 
    }
`

const CategoryContainer = ({match}) => {
    console.log(match.params)
    const {loading, error, data} = useQuery(GET_CATEGORY, {variables: {title: match.params.categoryId}})
    console.log(data)
    console.log(error)

    if (loading) return <SpinnerLoader />
    return (
        <CategoryPage category={data.getCollectionsByTitle}/>
    )
}

export default CategoryContainer