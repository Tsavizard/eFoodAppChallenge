const router = require('express').Router();
let CartItem = require('../models/cartItem.model');

//view cart
router.route('/').get((req, res) => {
  CartItem.find()
    .then(food => res.json(food))
    .catch(err => res.status(400).json('Error: ' + err));
});

//add new food cart
router.route('/addToCart').post((req, res) => {
  
  const foodName = req.body.foodName;
  const basePrice = req.body.basePrice;
  const condoments = req.body.condoments;
  const extras = req.body.extras;
  const conExPrice = req.body.conExPrice;
  const totalPrice = req.body.totalPrice;
  const qty = 1;

  const newCartItem = new CartItem({
    foodName,
    basePrice,
    conExPrice,
    condoments,
    extras,
    totalPrice,
    qty
  });

  newCartItem.save()
  .then(() => res.json('Added to cart!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

//delete food from cart
router.route('/deleteFromCart/:id').delete((req,res) =>{
  CartItem.findByIdAndDelete(req.params.id)
  .then(() => res.json('Removed from cart!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;