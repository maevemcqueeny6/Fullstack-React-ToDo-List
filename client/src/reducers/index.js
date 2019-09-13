// main point of this root reducer is to bring together our other reducers 
// auth or error reducer for later authentication 

import { combineReducers } from 'redux';
import itemReducer from './itemReducer';

// pass in an object with the different reducers 
export default combineReducers({
    // how to identify it from within components when we want to use it 
    item: itemReducer
    // if you had an auth reducer it would be an auth reducer 
    // auth: authReducer
})