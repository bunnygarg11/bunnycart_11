import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';
import ProductList from "./productListTest"

class ShoppingList extends Component {
  state={
    product:[],
    count:true
  }
  static propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  };

 async componentDidMount() {
    this.props.getItems();
   
  }
async componentDidUpdate(){
  if(this.props.item.length>0&& this.state.count){
    var arr=[]
    this.props.item.map(item=>{
    //   console.log(arr.includes(item.product_name))
      return arr.includes(item.product_name)===-1?(arr.push(item.product_name)):false
    })
    await this.setState({product:[...this.state.product,...arr],count:false})
  }
}
  onDeleteClick = id => {
    this.props.deleteItem(id);
  };

  render() {
    const { items } = this.props.item;
     console.log(this.state,this.props)
    const Shopping_List= <ListGroup>
    
      {this.state.product.map((prod) => (
        
          <ListGroupItem>
            {/* {this.props.isAuthenticated ? (
              <Button
                className='remove-btn'
                color='danger'
                size='sm'
                onClick={this.onDeleteClick.bind(this, _id)}
              >
                &times;
              </Button>
            ) : null} */}
            {prod}
            <ProductList product_name={prod}/ >
          </ListGroupItem>
        
      ))}
    
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
  item: state.item.items,
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