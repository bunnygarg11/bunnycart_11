const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const productSchema = new Schema({
    
    product_name: {
      type: String,
      required: true,
      
    },
    date:{
      type:Date,
      default:Date.now
    }
  });
  productSchema.virtual("items",{
    ref:"item",
    localField:"_id",
    foreignField:"product_id"
  })
  module.exports = product = mongoose.model('product', productSchema);