import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button,Table } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

class ShoppingList extends Component {
  static propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  };

  componentDidMount() {
    this.props.getItems();
  }

  onDeleteClick = id => {
    this.props.deleteItem(id);
  };

  render() {
    const { items } = this.props.item;
     
    const Shopping_List= <ListGroup>
    <TransitionGroup className='shopping-list'>
    <Table>
    <thead>
      {items.map(({ _id, name,product_name }) => (
        <CSSTransition key={_id} timeout={500} classNames='fade'>
          <ListGroupItem>
              
                  
                      <tr>
            {this.props.isAuthenticated ? (
                <td>
              <Button
                className='remove-btn'
                color='danger'
                size='sm'
                onClick={this.onDeleteClick.bind(this, _id)}
              >
                &times;for(i of items){
                    items[1]==items[5]

                }
              </Button>
              </td>
            ) : null}
            <td>{name}</td>
            <td>{product_name}</td>
            {/* <span>{product_name}</span> */}
            </tr>
          

          </ListGroupItem>
        </CSSTransition>
      ))}
        </thead>
            </Table>
    </TransitionGroup>
  </ListGroup>

    return (
      <Container>
        {/* <ListGroup>
          <TransitionGroup className='shopping-list'>
            {items.map(({ _id, name }) => (
              <CSSTransition key={_id} timeout={500} classNames='fade'>
                <ListGroupItem>
                  {this.props.isAuthenticated ? (
                    <Button
                      className='remove-btn'
                      color='danger'
                      size='sm'
                      onClick={this.onDeleteClick.bind(this, _id)}
                    >
                      &times;
                    </Button>
                  ) : null}
                  {name}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup> */}
        {this.props.isAuthenticated?Shopping_List:null}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
});

// export default connect(
//   mapStateToProps,
//   { getItems, deleteItem }
// )(ShoppingList);

export default connect(
  mapStateToProps,
  { getItems, deleteItem }
)(ShoppingList);
function bun11(c){
    return c
}
let array=["milan","mohit","vinod","param"]

array.forEach((x)=>{
    return x==="milan"
})
console.log(array)