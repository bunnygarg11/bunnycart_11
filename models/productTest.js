const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const productSchema = new Schema({
    user_id:{
      type:String, 
      required:true,
      trim:true
    },
    product_name: {
      type: String,
      required: true,
      trim:true
    }
  });
  
  module.exports = product = mongoose.model('product', productSchema);