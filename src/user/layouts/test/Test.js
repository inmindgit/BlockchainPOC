import React, { Component } from 'react'
import TestFormContainer from '../../ui/testform/TestFormContainer'

class Test extends Component {
    render() {
        return(
            <main className="container">
                <div className="pure-g">
                    <div className="pure-u-1-1">
                        <h1>Test</h1>
                        <p>Set and get properties on smart contract </p>
                        <TestFormContainer />
                    </div>
                </div>
            </main>
        )
    }
}

export default Test
