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
  condoments: [
    {
        condomentName: {
            type: String,
            required: true,
            unique: false,
            trim: false,
            minlength: 3
        },
        condomentValue: {
            type: Number,
            required: true,
            unique: false,
            trim: false,
            minlength: 3
        },
    }
  ], 
  extras: [
    {
        extraName: {
            type: String,
            required: true,
            unique: false,
            trim: false,
            minlength: 3
        },
        extraValue: {
            type: Number,
            required: true,
            unique: false,
            trim: false,
            minlength: 3
        },
    }
  ]
},
{
  timestamps: true,
}
);

const Food = mongoose.model('Food', foodsSchema);

module.exports = Food;