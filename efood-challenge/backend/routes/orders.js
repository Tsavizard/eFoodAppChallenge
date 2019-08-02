const router = require('express').Router();
let Order = require('../models/order.model');

//view orders
router.route('/').get((req, res) => {
  Order.find()
    .then(orders => res.json(orders))
    .catch(err => res.status(400).json('Error: ' + err));
});

//add new order
router.route('/add').post((req, res) => {
 const address = req.body.address;
 const foods = req.body.foods;
 const orderSum = req.body.orderSum;
 const status = req.body.status;

 const newOrder = new Order({
   address,
   foods,
   orderSum,
   status
 });

  newOrder.save()
    .then(() => res.json('Order added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//delete order
router.route('/:id').delete((req,res) =>{
  Order.deleteOne({})
  .then(() => res.json('Order deleted!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

//update order status
router.route('/:id').put((req, res) => {
  const status = req.body.status;
  Order.updateOne({status: req.body.status})
     .then(() => res.json(' Order(s) Modified!'))
     .catch(err => res.status(400).json('Error: ' + err));
 });

module.exports = router;