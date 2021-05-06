import React, {Component} from "react";
import SHOP_DATA from "./shop.data";
import CollectionPreview from "../../components/collection-preview/collection-preview.component";

class Shop extends Component {
    constructor(props) {
        super(props);

        this.state = {
            collections: SHOP_DATA
        }
    }

    render() {
        const {collections} = this.state
        return(
            <div className='shop'>
                {
                    collections.map(({id, ...collection}) => {
                        console.log({...collection})
                        return(
                            <CollectionPreview key={id} {...collection} />
                        )
                    })
                }
            </div>
        )
    }
}
export default Shop