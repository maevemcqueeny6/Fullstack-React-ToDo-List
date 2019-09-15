import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group'; 

// CONNECT COMES FROM REACT REDUX AND ALLOWS US TO GET STATE FROM REDUX INTO A REACT COMPONENT 
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

class TodoList extends Component {

    // this compoennt runs after the api request runs
    componentDidMount(){
        this.props.getItems();
    }

    onDeleteClick = (id) => {
        this.props.deleteItem(id);
        // access the function using prop types at the bottom, calling the ACTION delete item, which gets sent to the REDUCER ALONG WITH THE PAYLOAD and then the reducer filters the id of the deleted item 
    }


    // state = { 
    //     items: [
    //         { id: uuid(), name: 'Fit as many eggs in my mouth while still being able to say chuby bunny'},
    //         { id: uuid(), name: 'Flex'},
    //         { iud: uuid(), name: 'Prove my dad wrong'},
    //         { uuid: uuid(), name: 'murder my father for the throne'}
    //     ]
    // }

    render(){
        // this is called destructuring, its pulling an item and assigning it a name so we dont have to dig thru layers to get the items 
        const {items} = this.props.item;

        return(
            <Container>

                <ListGroup>
                    <TransitionGroup className="todolist">
                        {items.map(({ _id, name })=> (
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    {/* Adding a delete buttom */}
                                    <Button
                                        className="remove-btn"
                                        color="danger"
                                        size="sm"
                                        onClick={this.onDeleteClick.bind(this, _id)}
                                        // to access the id of the item, we bind the id of this click event to the function using this
                                        >
                                            &times;
                                        </Button>
                                    {name}
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        )
    }


}

TodoList.propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    // we use item because thats what we called the reducer in the root reducer.
    item: state.item
});

export default connect(mapStateToProps, { getItems, deleteItem })(TodoList);