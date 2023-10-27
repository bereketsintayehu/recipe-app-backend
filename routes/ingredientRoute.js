const express = require('express');
const router = express.Router();
const ingredientCtrl = require('../controllers/ingredientController');

router.get('/', ingredientCtrl.getAllIngredients);

router.post('/', ingredientCtrl.createIngredient);

router.get('/:id', ingredientCtrl.getOneIngredient);

router.put('/:id', ingredientCtrl.updateIngredient);

router.delete('/:id', ingredientCtrl.deleteIngredient);

module.exports = router;