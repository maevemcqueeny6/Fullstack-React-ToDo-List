import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group'; 
import uuid from 'uuid';

// CONNECT COMES FROM REACT REDUX AND ALLOWS US TO GET STATE FROM REDUX INTO A REACT COMPONENT 
import { connect } from 'react-redux';
import { getItems } from '../actions/itemActions';
import PropTypes from 'prop-types';

class TodoList extends Component {

    // this compoennt runs after the api request runs
    componentDidMount(){
        this.props.getItems();
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
                <Button
                    color="dark"
                    style={{marginBottom: '2rem'}}
                    onClick={() => {
                        const name = prompt("Enter Item");
                        if(name){
                            this.setState(state => ({
                                items: [...state.items, {id: uuid(), name: name}]
                            }))
                        }
                    }}
                >Add Item</Button>

                <ListGroup>
                    <TransitionGroup className="todolist">
                        {items.map(({ id, name })=> (
                            <CSSTransition key={id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    {/* Adding a delete buttom */}
                                    <Button
                                        className="remove-btn"
                                        color="danger"
                                        size="sm"
                                        onClick={()=> {
                                            this.setState(state => ({
                                                items: state.items.filter(item => item.id !==id)
                                            }));
                                        }}
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

export default connect(mapStateToProps, { getItems })(TodoList);