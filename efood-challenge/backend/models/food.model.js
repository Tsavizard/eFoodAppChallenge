const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const foodsSchema = new Schema({
  foodName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  basePrice: {
    type: Number,
    required: true,
    unique: false,
    trim: false,
    minlength: 3
  },
  condoments: [{ _id: false, condomentName: String, condomentValue: Number }], 
  extras: [{ _id: false, extraName: String, extraValue: Number }]
});

const Food = mongoose.model('Food', foodsSchema);

module.exports = Food;