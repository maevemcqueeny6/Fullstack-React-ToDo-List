// where we make our request to the backend 

import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

// GOES TO OUR ACTION REDUCER AND CHECKS THE SWITCH OPERATOR FOR THE ACTION.TYPE. TYPE FOR SWITHC OPERATOR  IN ITEMREDUCER FUNCTION
export const getItems = () => dispatch => {
    // set items loading to show that all items have been loaded and set that boolean value to true 
    dispatch(setItemsLoading());
    axios
        .get('/api/items')
        .then(res =>
            dispatch({
                // this is where we will send our type 
                type: GET_ITEMS,
                payload: res.data
                // this payload will be the data from the backend, picking up the routes from routes/api/items in our file structure 
            }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const addItem = item => (dispatch, getState) => {
    axios
        .post('api/items', item, tokenConfig(getState))
        .then(res => dispatch({
            type: ADD_ITEM,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const deleteItem = id => (dispatch, getState) => {
    axios
        .delete(`/api/items/${id}`, tokenConfig(getState))
        .then(res => dispatch({
            type: DELETE_ITEM,
            payload: id
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}



// return {
//     type: GET_ITEMS
// }


// export const deleteItem = (id) => {
//     return {
//         type: DELETE_ITEM,
//         payload: id
//     }
// }

// export const addItem = (item) => {
//     return {
//         type: ADD_ITEM,
//         payload: item
//     }
// }

export const setItemsLoading = () => {
    return {
        type: ITEMS_LOADING
    }
}

