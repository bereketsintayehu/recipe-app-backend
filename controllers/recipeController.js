const Recipe = require('../models/recipeSchema');
const Ingredient = require('../models/ingredientSchema')
const APIError = require('./../utils/apiError');
const APIFeatures = require('./../utils/apiFeatures')
const catchAsync  = require('./../utils/catchAsync')

exports.createRecipe = catchAsync(async (req, res) => {
    const newRecipe = await Recipe.create(req.body);
     res.status(200).json({
         status:"success",
         recipe: newRecipe
     })
})
exports.getAllRecipes = catchAsync(async(req,res)=>{
    let recipes  = await Recipe.find();
  
     for(let j = 0; j < recipes.length; j++){
        for (let i = 0; i < recipes[j].ingredients.length; i++) {
            const ingredientId = recipes[j].ingredients[i][0];
            const ingredient = await Ingredient.findById(ingredientId);
            recipes[j].ingredients[i][0] = ingredient;
        }
     }
     if(req.query.ingredient){
        recipes = recipes.filter((recipe)=>{
            return recipe.ingredients.some((ingredient)=>{
                return ingredient[0]._id == req.query.ingredient
            })
        })
     }
     res.status(200).json(
        recipes
     )
})
exports.getOneRecipe = catchAsync(async(req, res,next) => {
    let recipe  =  await Recipe.findById(req.params.id);
    for (let i = 0; i < recipe.ingredients.length; i++) {
        // get the ObjectId from the sub-array
        const ingredientId = recipe.ingredients[i][0];
        // find the corresponding ingredient document
        const ingredient = await Ingredient.findById(ingredientId);
        // replace the ObjectId with the whole ingredient document
        recipe.ingredients[i][0] = ingredient;
    }
    if(!recipe){
     return next(new APIError(`No Recipe fund with id = ${req.params.id}`,404))
    }
     res.status(200).json({
         status:"sucess",
         recipe       
     })
})

exports.updateRecipe = catchAsync(async (req,res,next)=>{
     const recipe = await Recipe.findByIdAndUpdate(req.params.id,req.body,
         {
         new:true,
         runValidators:true
     })
     if(!recipe){
         return next( new APIError(`No Recipe fund with id = ${req.params.id}`,404))
     }
     res.status(200).json({
         status:"sucess",
         recipe
     })
})
exports.deleteRecipe = catchAsync(async(req,res,next)=>{
     const recipe = await Recipe.findByIdAndDelete(req.params.id);
     if(!recipe){
         return next( new APIError(`No Recipe fund with id = ${req.params.id}`,404))
     }
     res.status(200).json({
         recipe
     })
})
