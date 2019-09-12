import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group'; 
import uuid from 'uuid';

class TodoList extends Component {
    state = { 
        items: [
            { id: uuid(), name: 'Fit as many eggs in my mouth while still being able to say chuby bunny'},
            { id: uuid(), name: 'Flex'},
            { iud: uuid(), name: 'Prove my dad wrong'},
            { uuid: uuid(), name: 'murder my father for the throne'}
        ]
    }

    render(){
        // this is called destructuring, its pulling an item and assigning it a name so we dont have to dig thru layers to get the items 
        const {items} = this.state;

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

export default TodoList;