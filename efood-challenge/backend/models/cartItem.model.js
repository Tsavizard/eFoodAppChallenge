const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartItemSchema = new Schema({

  foodName: {
    type: String,
    required: false,
    index: false,
    unique: false,
    trim: false,
    minlength: 3
  },
  
  basePrice: {
    type: Number,
    required: false,
    unique: false,
    trim: false,
    minlength: 3
  },

  conExPrice:  {
    type: Number,
    required: false,
    unique: false,
  },

  condoments: {
    type : Array,
    required: false,
    unique: false,
    trim: false
  },

  extras: {
    type : Array, 
    required: false,
    unique: false,
    trim: false
  },

  totalPrice:  {
    type: Number,
    required: false,
    unique: false,
  },

  qty: Number
  

});
cartItemSchema.set('autoIndex', false);
const CartItem = mongoose.model('CartItem', cartItemSchema);

module.exports = CartItem;