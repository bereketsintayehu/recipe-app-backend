const mongoose = require('mongoose');
const ingredientSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    photo_url: { type: String, required: true },
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

ingredientSchema.virtual('recipes', {
    ref: 'Recipe',
    foreignField: 'ingredients',
    localField: '_id'
});

ingredientSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'recipes',
    });
    next();
});

module.exports = mongoose.model('Ingredient', ingredientSchema);
