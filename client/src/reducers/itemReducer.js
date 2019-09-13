// a reducer is where our state is goign to go. where we check our actions from our actions file, which will dispatch to the reducer, and it can send along a payload if we want
import uuid from 'uuid';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM } from '../actions/types';

const initialState = {
    items: [
        { id: uuid(), name: 'Fit as many eggs in my mouth while still being able to say chuby bunny'},
        { id: uuid(), name: 'Flex'},
        { iud: uuid(), name: 'Prove my dad wrong'},
        { uuid: uuid(), name: 'murder my father for the throne'}
    ]
}

// requires a switch statement to jump between them
export default function( state = initialState, action ){
    switch(action.type){
        case GET_ITEMS:
            return {
                ...state 
            }
            default: 
                return state;
    }
}