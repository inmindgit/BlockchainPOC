import ProductStorageContract from '../../../../build/contracts/ProductStorage.json'
import store from '../../../store'
import { browserHistory } from 'react-router'

const contract = require('truffle-contract')


export const USER_UPDATED = 'ID_UPDATED'
function updated(data) {
    return {
        type: USER_UPDATED,
        payload: data
    }
}

export function productActions(data) {
    let web3 = store.getState().web3.web3Instance

    // Double-check web3's status.
    if (typeof web3 !== 'undefined') {

        return function(dispatch) {
            // Using truffle-contract we create the authentication object.
            const simpleStorage = contract(ProductStorageContract)
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

                    simpleStorageInstance.setProduct(data.name, data.price, {from: coinbase})
                        .then(function(result) {
                            console.log("saved", result)
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

export function productResult() {
    let web3 = store.getState().web3.web3Instance

    // Double-check web3's status.
    if (typeof web3 !== 'undefined') {

        return function(dispatch) {
            // Using truffle-contract we create the authentication object.
            const getTest = contract(ProductStorageContract)
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
                    getTestInstance.getProduct(coinbase)
                        .then(function(result) {
                            console.log("get", result);

                            var name = result[0];
                            var price = result[1].c[0]

                            dispatch(updated({
                                "name": name,
                                "price": price
                            }))
                        })
                        .catch(function(result) {
                            console.log(result);
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