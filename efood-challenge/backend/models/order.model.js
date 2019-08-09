const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ordersSchema = new Schema({
  
  address: {
    type: String,
    required: true,
    unique: false
  },
  foods: [
    { _id: false,
      foodName: String, 
      basePrice: Number,
      condoments: Array,
      extras: Array,
      conExPrice: Number,
      totalPrice: Number
    }
  ], 
  orderSum: Number,
  status:{
      type: String
  },
},
{
  timestamps: true,
}
);
ordersSchema.set('autoIndex', false);
const Order = mongoose.model('Order', ordersSchema);

module.exports = Order;