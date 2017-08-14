import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import userReducer from './user/userReducer'
import web3Reducer from './util/web3/web3Reducer'
import idReducer from "./user/idReducer";
import productReducer from "./user/productReducer";

const reducer = combineReducers({
  routing: routerReducer,
    user: userReducer,
    web3: web3Reducer,
    idUser: idReducer,
    productReducer: productReducer
})

export default reducer
