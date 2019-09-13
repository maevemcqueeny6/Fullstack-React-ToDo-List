// where we make our request to the backend 

import { GET_ITEMS, ADD_ITEM, DELETE_ITEM } from './types';

// GOES TO OUR ACTION REDUCER AND CHECKS THE SWITCH OPERATOR FOR THE ACTION.TYPE. TYPE FOR SWITHC OPERATOR  IN ITEMREDUCER FUNCTION
export const getItems = () => {
    return {
        type: GET_ITEMS
    }
}
