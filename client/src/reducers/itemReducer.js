// a reducer is where our state is goign to go. where we check our actions from our actions file, which will dispatch to the reducer, and it can send along a payload if we want
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from '../actions/types';

const initialState = {
    items: [
        // { id: uuid(), name: 'Fit as many eggs in my mouth while still being able to say chuby bunny'},
        // { id: uuid(), name: 'Flex'},
        // { iud: uuid(), name: 'Prove my dad wrong'},
        // { uuid: uuid(), name: 'murder my father for the throne'}
    ],
    loading: false
}

// requires a switch statement to jump between them
export default function( state = initialState, action ){
    switch(action.type){
        case GET_ITEMS:
            return {
                ...state,
                items: action.payload,
                loading: false
            }
        case DELETE_ITEM:
            return {
                ...state,
                items: state.items.filter(item => item._id !== action.payload)
                // in our action we passed in a payload, which we can access with action.payload the same way we could access the typw with action.type for the switch case function
            }
        case ADD_ITEM:
            return {
                ...state,
                items: [action.payload, ...state.items]
            }
        case ITEMS_LOADING: 
            return{ 
                ...state,
                loading: true
            }
        default: 
                return state;
    }
}