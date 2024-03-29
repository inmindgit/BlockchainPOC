import SimpleStorageContract from '../../../../build/contracts/SimpleStorage.json'
import store from '../../../store'
import { browserHistory } from 'react-router'

const contract = require('truffle-contract')


export const USER_UPDATED = 'ID_UPDATED'
function idUpdated(id) {
    return {
        type: USER_UPDATED,
        payload: id.c[0]
    }
}

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
                            console.log("saved")
                            // dispatch(testResult())
                            return browserHistory.push('/dashboard')
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

export function testResult() {
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
                    getTestInstance.get({from: coinbase})
                        .then(function(result) {
                            console.log(result);
                            dispatch(idUpdated(result))
                        })
                        .catch(function(result) {
                            console.error('Wallet ' + coinbase + ' does not have an account!')

                            return browserHistory.push('/dashboard')
                        })
                })
            })
        }
    } else {
        console.error('Web3 is not initialized.');
    }
}