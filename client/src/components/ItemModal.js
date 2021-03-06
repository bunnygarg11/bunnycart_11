import React, { Component } from "react";
import {
Button,
Modal,
ModalHeader,
ModalBody,
Form,
FormGroup,
Label,
Input,
Alert
} from "reactstrap";
import { connect } from "react-redux";
import { addItem } from "../actions/itemActions";
import {clearErrors} from "../actions/errorActions"
import PropTypes from "prop-types";

class ItemModal extends Component {
state = {
modal: false,
name: [],
itemlist: ["item1", "item2", "item3", "item4"],
step: 1,
Product_name:"",
formcontent: null,
msg:null
};

static propTypes = {
isAuthenticated: PropTypes.bool
};

componentDidMount=()=>{
this.formchange()
}
componentDidUpdate(prevProps) {
  const { error, isAuthenticated } = this.props;
  if (error !== prevProps.error) {
    // Check for register error
    if (error.id === "PRODUCT_REPEATED") {
      this.setState({ msg: error.msg.msg });
    } else {
      this.setState({ msg: null });
    }
  }

  // If authenticated, close modal
  // if (this.state.modal) {
  //   if (isAuthenticated) {
  //     this.toggle();
  //   }
  // }
}
toggle = async () => {
 await this.props.clearErrors()
await this.setState({
modal: !this.state.modal
});
};

increment = async () => {
await this.setState({ step: this.state.step + 1 });
this.formchange();
};

decrement = async () => {
await this.setState({ step: this.state.step - 1 });
this.formchange();
};

onChange = async val => {
// const arr = this.state.name.filter(item => {
// return item != val ? true : false;
// //return Object.keys(item)!=Object.keys(val)?true:false
// });
// if (arr.length == this.state.name.length) {
// arr.splice(0, 0, val);
// this.setState({ name: [...arr] });
// } else {
// this.setState({ name: [...arr] });
// }

    const items = this.state.name;
    const arr = items.filter(item => {
      return Object.keys(item)[0] !== Object.keys(val)[0] ? true : false;
    });
    // console.log(arr);
    if (arr.length == this.state.name.length) {
      this.setState({ name: [val, ...arr] });
    } else {
      this.setState({ name: [...arr] });
    }

};
onqty=async(val)=>{
    const items = this.state.name;
    const arr = items.filter(item => {
      return Object.keys(item)[0] !== Object.keys(val)[0] ? true : false;
    });
    
        this.setState({ name: [val, ...arr] });

}
onSubmit = async e => {
e.preventDefault();

// for (let i = 0; i < this.state.name.length; i++) {
// let newItem = {
// name: this.state.name[i]
// };
// await this.props.addItem(newItem);
// }
let newItem={
    Product_name:this.state.Product_name,
    itemlist:this.state.name
}
await this.props.addItem(newItem)
 this.setState({ name: [] ,step:1,formcontent:(
    <React.Fragment>
    <input
    placeholder="Product Name"
    onChange={e => {
    this.setState({Product_name:e.target.value});
    }}
    />
    <br/>
    <input
    type="button"
    value="next"
    onClick={e => {
    this.increment();
    }}
    />
    </React.Fragment>
    
    )});
//  this.setState({step:1})
//  this.setState({formcontent:null})

// this.toggle();
};

formchange = () => {
switch (this.state.step) {
case 1:
this.setState({
formcontent: (
<React.Fragment>
<input
placeholder="Product Name"
onChange={e => {
this.setState({Product_name:e.target.value});
}}
/>
<br/>
<input
type="button"
value="next"
onClick={e => {
this.increment();
}}
/>
</React.Fragment>

)
});
break;
case 2:
this.setState({
formcontent: 
<React.Fragment>
{this.renderList()}
<br/>
<input
type="button"
value="prev"
onClick={e => {
this.decrement();
}}
/>
<input
type="button"
value="next"
onClick={e => {
this.increment();
}}
/>
</React.Fragment>

});
break;
case 3:
this.setState({
formcontent: 
<React.Fragment>
<p>{this.state.Product_name}</p>
{this.showlists()}
<input
type="button"
value="prev"
onClick={e => {
this.decrement();
}}
/>
<Button color="dark" style={{ marginTop: "2rem" }} block>
Add Item
</Button>
</React.Fragment>
})
break;
default:
break;
}
};

showlists=()=>{
return this.state.name.map((item)=>{
return (
<React.Fragment>
<li key={Object.keys(item)[0]}>
{Object.keys(item)[0]}
{Object.values(item)[0]}
</li>
</React.Fragment>
)
})
}

renderList = () => {
return this.state.itemlist.map(itemm => {
return (
<React.Fragment>
<br />
<div>
<label htmlfor={itemm} style={{padding:"1px"}}>
<input
type="text"
name="name"
key={itemm}
type="checkbox"
value={itemm}
onClick={e => this.onChange({[e.target.value]:1})}
/>
{itemm}
</label>
<input style={{width:"45px"}} min={1} onChange={e=>this.onqty({[itemm]:e.target.value})} type="number"/>
</div>
</React.Fragment>
);
});
};

render() {
// console.log(this.props.email)

return (
<div>
{this.props.isAuthenticated ? (
<Button
color="dark"
style={{ marginBottom: "2rem" }}
onClick={this.toggle}
>
Add Item
</Button>
) : (
<h4 className="mb-3 ml-4">Please log in to manage items</h4>
)}

<Modal isOpen={this.state.modal} toggle={this.toggle}>
<ModalHeader toggle={this.toggle}>Add To Shopping List</ModalHeader>
<ModalBody>
{this.state.msg ? (
              <Alert color='danger'>{this.state.msg}</Alert>
            ) : null}
<Form onSubmit={this.onSubmit}>
<FormGroup>
<Label for="item">Item</Label>
{this.state.formcontent}
<br />
</FormGroup>
</Form>
</ModalBody>
</Modal>
</div>
);
}
}

const mapStateToProps = state => ({
item: state.item,
isAuthenticated: state.auth.isAuthenticated,
email: state.auth.user,
error:state.error
});

export default connect(mapStateToProps, { addItem,clearErrors })(ItemModal);