const router = require('express').Router();
let Food = require('../models/food.model');

//view menu
router.route('/').get((req, res) => {
  Food.find()
    .then(food => res.json(food))
    .catch(err => res.status(400).json('Error: ' + err));
});

//add new Food in menu
router.route('/add').post((req, res) => {
  const foodName = req.body.foodName;
  const basePrice = req.body.basePrice;
  const condoments = req.body.condoments;
  const extras = req.body.extras;

  const newFood = new Food({
    foodName,
    basePrice,
    condoments,
    extras,
  });

  newFood.save()
  .then(() => res.json('Food added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

//delete food from menu
router.route('/:id').delete((req,res) =>{
  Food.deleteOne({})
  .then(() => res.json('Food deleted!'))
  .catch(err => res.status(400).json('Error: ' + err));
});


//TODO update food

module.exports = router;