const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
const Schema = mongoose.Schema;


const ItemListSchema = new Schema({
  name: {
    type: String,
    required: true
  },

});

const ItemList = mongoose.model('itemList', ItemListSchema);
fun =async ()=>{
    const number = await ItemList.countDocuments();
    if(number<1){
    const arr=['item 1', 'item 2','item 3','item 4','item 5','item 6','item 7','item 8']
    arr.forEach((item)=>{
    ItemList.insertMany({name:item})
    })
    }
    }
    fun()

module.exports=ItemList