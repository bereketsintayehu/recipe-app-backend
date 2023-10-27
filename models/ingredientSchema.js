const mongoose = require('mongoose');
const ingredient = mongoose.Schema({
    name: {type: String, required: true, unique: true},
    photo_url: {type: String, required: true},
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
}
)
ingredient.virtual('recipes', {
    ref: 'Recipe',
    foreignField: 'ingredients',
    localField: '_id'
}),

ingredient.pre(/^find/, function(next) {
    this.populate({
      path: 'ingre',
    });
    next();
  });
module.exports = mongoose.model('Ingredient', ingredient);