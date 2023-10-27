const mongoose = require('mongoose');

const category = mongoose.Schema({    
    name: {type: String, required: true, unique: true},
    photo_url: {type: String, required: true},
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})


category.virtual('recipes', {
    ref: 'Recipe',
    foreignField: 'category',
    localField: '_id'
}),

module.exports = mongoose.model('Category', category);