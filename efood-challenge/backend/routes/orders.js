const router = require('express').Router();
let Order = require('../models/order.model');

//view orders
router.route('/').get((req, res) => {
  Order.find()
    .then(orders => res.json(orders))
    .catch(err => res.status(400).json('Error: ' + err));
});

//add new order
router.route('/addToOrders').post((req, res) => {
 const address = req.body.address;
 const foods = req.body.cart;
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
router.route('/deleteFromOrders/:id').delete((req,res) =>{
  Order.findByIdAndDelete(req.params.id)
  .then(() => res.json('Order deleted!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

//update order status
router.route('/updateInOrders/:id').patch((req, res) => {
  Order.findByIdAndUpdate({ _id : req.params.id}, { status : req.body.status})
     .then(() => res.json(' Order(s) Modified!'))
     .catch(err => res.status(400).json('Error: ' + req.params.id));
 });

module.exports = router;