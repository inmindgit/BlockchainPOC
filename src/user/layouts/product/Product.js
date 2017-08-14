import React, { Component } from 'react'
import ProductFormContainer from '../../ui/productForm/ProductFormContainer'

class Product extends Component {
    render() {
        return(
            <main className="container">
                <div className="pure-g">
                    <div className="pure-u-1-1">
                        <h1>Product</h1>
                        <p>Set name, price and get properties on smart contract </p>
                        <ProductFormContainer />
                    </div>
                </div>
            </main>
        )
    }
}

export default Product
