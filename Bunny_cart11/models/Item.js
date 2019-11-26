const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
const Schema = mongoose.Schema;


const ItemSchema = new Schema({
  product_id:{
    type:mongoose.Schema.Types.ObjectId, 
    required:true,
    ref:"product"
  },
  quantity:{
    type:String,
    required:true
  },
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Item = mongoose.model('item', ItemSchema);
