import SimpleStorageContract from '../../../../build/contracts/SimpleStorage.json'
import store from '../../../store'
import { browserHistory } from 'react-router'

const contract = require('truffle-contract')

export function testActions(id) {
    let web3 = store.getState().web3.web3Instance

    // Double-check web3's status.
    if (typeof web3 !== 'undefined') {

        return function(dispatch) {
            // Using truffle-contract we create the authentication object.
            const simpleStorage = contract(SimpleStorageContract)
            simpleStorage.setProvider(web3.currentProvider)

            // Declaring this for later so we can chain functions on Authentication.
            var simpleStorageInstance

            // Get current ethereum wallet.
            web3.eth.getCoinbase((error, coinbase) => {
                // Log errors, if any.
                if (error) {
                    console.error(error);
                }

                simpleStorage.deployed().then(function(instance) {
                    simpleStorageInstance = instance

                    // Attempt to sign up user.
                    simpleStorageInstance.set(id, {from: coinbase})
                        .then(function(result) {
                            console.log(result)
                            // If no error, login user.
                            return dispatch(TestResult())
                        })
                        .catch(function(result) {
                            // If error...
                            console.log(error);
                        })
                })
            })
        }
    } else {
        console.error('Web3 is not initialized.');
    }
}

export function TestResult() {
    let web3 = store.getState().web3.web3Instance

    // Double-check web3's status.
    if (typeof web3 !== 'undefined') {

        return function(dispatch) {
            // Using truffle-contract we create the authentication object.
            const getTest = contract(SimpleStorageContract)
            getTest.setProvider(web3.currentProvider)

            // Declaring this for later so we can chain functions on Authentication.
            var getTestInstance

            // Get current ethereum wallet.
            web3.eth.getCoinbase((error, coinbase) => {
                // Log errors, if any.
                if (error) {
                    console.error(error);
                }

                getTest.deployed().then(function(instance) {
                    getTestInstance = instance

                    // Attempt to login user.
                    getTestInstance.get
                        .then(function(result) {
                            // If no error, login user.
                            dispatch(TestRecive(result))

                            console.log("asdasdasd");

                            // Used a manual redirect here as opposed to a wrapper.
                            // This way, once logged in a user can still access the home page.
                            // var currentLocation = browserHistory.getCurrentLocation()

                            // if ('redirect' in currentLocation.query)
                            // {
                            //     return browserHistory.push(decodeURIComponent(currentLocation.query.redirect))
                            // }

                            return browserHistory.push('/login')
                        })
                        .catch(function(result) {
                            console.log(result)
                            // If error, go to signup page.
                            console.error('Wallet ' + coinbase + ' does not have an account!')

                            return browserHistory.push('/signup')
                        })
                })
            })
        }
    } else {
        console.error('Web3 is not initialized.');
    }
}

function TestRecive(id) {
    return {
        id: id
    }
}