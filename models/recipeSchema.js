const mongoose = require('mongoose');
const Ingredient = require('./ingredientSchema');

const recipeSchema = mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Recipe must belong to a Category.']
    },
    title: { type: String, required: true },
    ingredients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ingredient'
    }],
    photo_url: { type: String, required: true },
    photosArray: [String],
    time: { type: String, required: true },
    description: { type: String, required: true }
});

recipeSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'category'
    });
    next();
});

recipeSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'ingredients',
        model: Ingredient
    }).execPopulate();
    next();
});

module.exports = mongoose.model('Recipe', recipeSchema);
