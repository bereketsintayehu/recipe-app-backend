const Ingredient = require('../models/ingredientSchema');
const catchAsync  = require('./../utils/catchAsync')
const APIError = require('./../utils/apiError')

exports.createIngredient = catchAsync(async (req, res) => {
    console.log(req.body)
    const newIngredient = await Ingredient.create(req.body);
     res.status(200).json({
         status:"success",
         catagory: newIngredient
     })
})
exports.getAllIngredients = catchAsync(async(req,res)=>{
     const ingredients = await Ingredient.find().populate('recipes');
     res.status(200).json(
         ingredients  
     )
})
exports.getOneIngredient = catchAsync(async(req, res,next) => {
    const ingredient  =  await Ingredient.findById(req.params.id);
    if(!ingredient){
     return next(new APIError(`No Ingredient fund with id = ${req.params.id}`,404))
    }
     res.status(200).json({
         status:"sucess",
         ingredient  
     })
 
})
 
exports.updateIngredient = catchAsync(async (req,res,next)=>{
     const ingredient = await Ingredient.findByIdAndUpdate(req.params.id,req.body,
         {
         new:true,
         runValidators:true
     })
     if(!ingredient){
         return next( new APIError(`No Ingredient fund with id = ${req.params.id}`,404))
     }
     res.status(200).json({
         status:"sucess",
         ingredient 
     })
})
exports.deleteIngredient = catchAsync(async(req,res,next)=>{
     const ingredient = await Ingredient.findByIdAndDelete(req.params.id);
     if(!ingredient){
         return next( new APIError(`No Ingredient fund with id = ${req.params.id}`,404))
     }
     res.status(200).json({
         status:"sucess",
         ingredient 
     })
})


// exports.getAllIngredients = (req, res, next) => {
//     Ingredient.find().then(
//         (ingredients) => {
//             res.status(200).json(ingredients);
//         }
//     ).catch(
//         (error) => {
//             res.status(500).json({
//                 message: 'Api failed to connect due to' + error, 
//             })
//         }
//     );
// }

// exports.createIngredient = (req, res, next) => {    
//     const ingredient = new Ingredient({
        
//     });

//     ingredient.save().then(
//         () => {
//             res.status(201).json({
//                 message: 'Ingredient saved to db succesfully!'
//             })
//         }
//     ).catch(
//         (error) => {
//             res.status(500).json({
//                 error,
//             });
//         }
//     );

// }

// exports.getOneIngredient = (req, res, next) => {
//     const { id } = req.params;
//     Ingredient.findOne({ _id: id }).then(
//         (ingredient) => {
//             res.status(200).json(ingredient);
//         }
//     ).catch(
//         (error) => {
//             res.status(500).json({
//                 error,
//             });
//         }
//     )
// }
// exports.updateIngredient = (req, res, next) => {
//     const { id } = req.params;
//     const ingredient = new Ingredient({     
//     })
//     Ingredient.updateOne({ _id: id }, ingredient).then(
//         () => {
//             res.status(201).json({
//                 message: 'Recipe updated succesfully!',
//             })
//         }
//     ).catch(
//         (error) => {
//             res.status(500).json({
//                 error,
//             })
//         }
//     );
// }

// exports.deleteIngredient = (req, res, next) => {
//     const { id } = req.params;
//     Ingredient.deleteOne({ _id: id }).then(
//         () => {
//             res.status(200).json({
//                 message: 'Ingredient deleted succesfully from db!'
//             })
//         }
//     ).catch(
//         (error) => {
//             res.status(500).json({
//                 error,
//             })
//         }
//     )
// }