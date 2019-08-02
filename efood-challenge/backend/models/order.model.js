const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ordersSchema = new Schema({
  address: {
    type: String,
    required: true,
    unique: false,
    trim: true,
    minlength: 3
  },
  foods: [
    { _id: false,
      foodName: String, 
      basePrice: Number,
      condoments: [{
        _id: false,
        condomentName: String,
        condomentValue: Number
      }],
      extras: [{
        _id: false,
        extraName: String,
        extraValue: Number
      }],
        foodTotalValue: Number
    }
  ], 
  orderSum: {
    type: Number,
    required: true,
    unique: false,
    trim: false,
    minlength: 3
  },
  status:{
      type: String
  },
},
{
  timestamps: true,
}
);

const Order = mongoose.model('Order', ordersSchema);

module.exports = Order;