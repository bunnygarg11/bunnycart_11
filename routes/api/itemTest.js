const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const products =require('../../models/products')
const Item = require('../../models/Item');

router.get('/', (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items));
});


router.post('/', auth, async(req, res) => {
  // const newItem = new Item({
  //   name: req.body.name
  // });

  // newItem.save().then(item => res.json(item));
  const {Product_name, itemlist}=req.body;
  itemlist.map((item)=>{
    await Item.insertMany({product_name:Product_name, name:item})
  })
  const response=await Item.find({product_name:Product_name})
console.log(response)
  res.json({name:"Bunny"})
  // res.json({name:Product_name});
});


router.delete('/:id', auth, (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;