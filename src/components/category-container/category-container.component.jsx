import React from 'react'

// import {useQuery} from "@apollo/react-hooks";
// import {gql} from "apollo-boost";
//
// import CategoryPage from "../../pages/category/category.component";
// import SpinnerLoader from "../loaders/spinner-loader.component";
//
// const GET_CATEGORY = gql `
//     query getCollectionsByTitle($title: String!){
//       getCollectionsByTitle(title: $title){
//         id,
//         title,
//         items {
//             id,
//             name,
//             price
//         }
//       }
//     }
// `
//
// const CategoryContainer = (props) => {
//     console.log('Props: ',props)
//     const queryVariable = {"title": `${props.match.params.categoryId}`}
//     const {loading, error, data} = useQuery(GET_CATEGORY, {variables: queryVariable})
//     console.log(`loading: ${loading}`)
//     console.log(`Error: ${error}`)
//
//     return loading?  (<SpinnerLoader />)
//     :(
//         <CategoryPage category={data?.getCollectionsByTitle} {...props}/>
//     )
// }

import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import SpinnerLoader from "../loaders/spinner-loader.component";
import CategoryPage from "../../pages/category/category.component";

const GET_COLLECTION_BY_TITLE = gql`
  query getCollectionsByTitle($title: String!) {
    getCollectionsByTitle(title: $title) {
      id
      title
      items {
        id
        name
        price
        imageUrl
      }
    }
  }
`;

const CategoryContainer = ({ match }) => (
    <Query
        query={GET_COLLECTION_BY_TITLE}
        variables={{ title: match.params.collectionId }}
    >
        {({ loading, error, data }) => {
            return loading ? (
                <SpinnerLoader />
            ) : (
                <CategoryPage category={data.getCollectionsByTitle} />
            );
        }}
    </Query>
);
export default CategoryContainer