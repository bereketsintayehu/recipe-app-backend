const Category = require('../models/categorySchema');
const Ingredient = require('../models/ingredientSchema');
const catchAsync  = require('./../utils/catchAsync')
const APIError = require('./../utils/apiError')

exports.createCategory = catchAsync(async (req, res) => {
    console.log(req.body)
    const newCategory = await Category.create(req.body);
     res.status(200).json({
         status:"success",
         catagory: newCategory
        
     })
})
exports.getAllCategorys = catchAsync(async(req,res)=>{
     const categorys = await Category.find().populate('recipes');
     for(let k = 0; k < categorys.length; k++){
         for(let j = 0; j < categorys[k].recipes.length; j++){
            for (let i = 0; i < categorys[k].recipes[j].ingredients.length; i++) {
                const ingredientId = categorys[k].recipes[j].ingredients[i][0];
                const ingredient = await Ingredient.findById(ingredientId);
                categorys[k].recipes[j].ingredients[i][0] = ingredient;
                

            }
         }
     }
     res.status(200).json(
         categorys  
     )
})
exports.getOneCategory = catchAsync(async(req, res,next) => {
    const category  =  await Category.findById(req.params.id)
    if(!category){
     return next(new APIError(`No Category fund with id = ${req.params.id}`,404))
    }
     res.status(200).json({
         category  
     })
 
})
 
exports.updateCategory = catchAsync(async (req,res,next)=>{

     const category = await Category.findByIdAndUpdate(req.params.id,req.body,
         {
         new:true,
         runValidators:true
     })
     if(!category){
         return next( new APIError(`No Category fund with id = ${req.params.id}`,404))
     }
     res.status(200).json({
         category 
     })
})
exports.deleteCategory = catchAsync(async(req,res,next)=>{
     const category = await Category.findByIdAndDelete(req.params.id);
     if(!category){
         return next( new APIError(`No Category fund with id = ${req.params.id}`,404))
     }
     res.status(200).json({
         category 
     })
})


// exports.getAllCategorys = (req, res, next) => {
//     Category.find().then(
//         (categorys) => {
//             res.status(200).json(categorys);
//         }
//     ).catch(
//         (error) => {
//             res.status(500).json({
//                 message: 'Api failed to connect due to' + error, 
//             })
//         }
//     );
// }

// exports.createCategory = (req, res, next) => {    
//     const category = new Category({

//     });

//     Category.save().then(
//         () => {
//             res.status(201).json({
//                 message: 'Category saved to db succesfully!'
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

// exports.getOneCategory = (req, res, next) => {
//     const { id } = req.params;
//     Category.findOne({ _id: id }).then(
//         (category) => {
//             res.status(200).json(category);
//         }
//     ).catch(
//         (error) => {
//             res.status(500).json({
//                 error,
//             });
//         }
//     )
// }

// exports.updateCategory = (req, res, next) => {
//     const { id } = req.params;
//     const category = new Category({

//     })
//     Category.updateOne({ _id: id }, recipe).then(
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

// exports.deleteCategory = (req, res, next) => {
//     const { id } = req.params;
//     Category.deleteOne({ _id: id }).then(
//         () => {
//             res.status(200).json({
//                 message: 'Category deleted succesfully from db!'
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