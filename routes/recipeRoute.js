const express = require('express');
const router = express.Router();
const recipeCtrl = require('./../controllers/recipeController');
const authCtrl = require('./../controllers/authController')

router.get('/', recipeCtrl.getAllRecipes);
router.post('/', recipeCtrl.createRecipe);
router.get('/:id', recipeCtrl.getOneRecipe);
router.patch('/:id', recipeCtrl.updateRecipe);
router.delete('/:id', recipeCtrl.deleteRecipe);
module.exports = router;