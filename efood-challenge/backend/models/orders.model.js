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
    {
        foodName: {
            type: String,
            required: true,
            unique: false,
            trim: false,
            minlength: 3
        }, 
        foodCondoments: {
            type: String,
            required: true,
            unique: false,
            trim: false,
            minlength: 3
        },
        foodExtras: {
            type: String,
            required: true,
            unique: false,
            trim: false,
            minlength: 3
        },
        foodTotalValue: {
            type: Number,
            required: true,
            unique: false,
            trim: false,
            minlength: 3
        },
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