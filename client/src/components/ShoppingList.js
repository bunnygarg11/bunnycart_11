import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem ,getProducts} from '../actions/itemActions';
import PropTypes from 'prop-types';
import ProductList from "./productListTest"
import EditModal from "./editModal"

class ShoppingList extends Component {
  static propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  };

  componentDidMount() {
    this.props.getProducts();
  }

  onDeleteClick = id => {
    this.props.deleteItem(id);
  };

  render() {
    const { products} = this.props.item;
     
    const Shopping_List= <ListGroup>
    
      {products.map(({ _id, product_name}) => {

        return (  
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
            {product_name}
            <ProductList product_Id={_id} product_name={product_name}/>
            
          </ListGroupItem>
        )
      })}
    
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
  { getItems, deleteItem,getProducts}
)(ShoppingList);