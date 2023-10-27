const mongoose = require('mongoose');
const Ingredient = require('./ingredientSchema')
const recipe = mongoose.Schema({
    category: { type: mongoose.Schema.ObjectId,
        ref: 'Category',
        required: [true, 'Recipe must belong to a Category.']
    },
    title: {type: String, required: true},
    ingredients: {type: [], required: true},
    photo_url: {type: String, required: true},
    photosArray: {type: [], required: true},
    time: {type: String, required: true},
    description: {type: String, required: true},
})

recipe.pre(/^find/, function(next) {
    this.populate({
      path: 'category',
    });
    next();
  });
recipe.pre(/^find/,  async function(next) {
    // console.log(this.title)
    // for(let j = 0; j < this.ingredients.length; j++){
    //     Ingredient.findById(this.ingredients[j][0]).then((val)=>{
    //         this.ingredients[j][0] = val
    //     }).catch((error)=>{
    //             console.log(error)
    //     })
        
    // }
    next();
});
  
module.exports = mongoose.model('Recipe', recipe);

  