import React, { Component } from 'react'

class ProductForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: undefined,
            price: undefined
        }
    }
    componentWillMount() {
        this.fillInput();
    }

    componentWillReceiveProps(nextProps){
        console.log("asdasdas", nextProps); //you can log data from props here to check
        this.setState({
            name: nextProps.data.name,
            price: nextProps.data.price
        })
    }

    fillInput(){
        this.props.onChargueProductForm();
    }

    onInputNameChange(event) {
        this.setState({ name: event.target.value })
    }

    onInputPriceChange(event) {
        this.setState({ price: event.target.value })
    }

    handleSubmit(event) {
        event.preventDefault()

        if (this.state.name.length < 1)
        {
            return alert('Please fill your Name.')
        }

        if (this.state.price.length < 1)
        {
            return alert('Please fill your Price.')
        }

        this.props.onProductFormSubmit(this.state)
    }

    render() {
        return(
            <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit.bind(this)}>
                <fieldset>
                    <label htmlFor="id">Some Name</label>
                        <input id="id" type="text" value={this.state.name} onChange={this.onInputNameChange.bind(this)} placeholder="Name" />
                    <span className="pure-form-message">This is a required field.</span>

                    <br />

                    <label htmlFor="id">Some Price</label>
                        <input id="id" type="number" value={this.state.price} onChange={this.onInputPriceChange.bind(this)} placeholder="Price" />
                    <span className="pure-form-message">This is a required field.</span>

                    <br />

                    <button type="submit" className="pure-button pure-button-primary">Submit</button>
                </fieldset>
            </form>
        )
    }
}

export default ProductForm
