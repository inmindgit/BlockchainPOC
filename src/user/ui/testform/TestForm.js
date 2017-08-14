import React, { Component } from 'react'

class TestForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: ''
        }

    }
    componentWillMount() {
        this.fillInput();
        // console.log(w);
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps); //you can log data from props here to check
        this.setState({ id: nextProps.id })
    }

    fillInput(){
        this.props.onChargueForm();
    }

    onInputChange(event) {
        this.setState({ id: event.target.value })
    }

    handleSubmit(event) {
        event.preventDefault()

        if (this.state.id.length < 1)
        {
            return alert('Please fill your ID.')
        }

        this.props.onTestFormSubmit(this.state.id)
    }

    render() {
        return(
            <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit.bind(this)}>
                <fieldset>
                    <label htmlFor="id">Some ID</label>
                    <input id="id" type="number" value={this.state.id} onChange={this.onInputChange.bind(this)} placeholder="ID" />
                    <span className="pure-form-message">This is a required field.</span>

                    <br />

                    <button type="submit" className="pure-button pure-button-primary">Submit</button>
                </fieldset>
            </form>
        )
    }
}

export default TestForm
