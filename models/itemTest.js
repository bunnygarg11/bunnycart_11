const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
const Schema = mongoose.Schema;


const ItemSchema = new Schema({
  product_name:{
    type:String, 
    required:true,
    trim:true
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
