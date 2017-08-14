import { connect } from 'react-redux'
import ProductForm from './ProductForm'
import { productActions, productResult } from './ProductFormActions'

const mapStateToProps = (state, ownProps) => {
    return {
        data: state.productReducer.data
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onProductFormSubmit: (data) => {
            event.preventDefault();

            dispatch(productActions(data))
        },
        onChargueProductForm: () => {
            dispatch(productResult())
        }
    }
}

const ProductFormContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductForm)

export default ProductFormContainer
