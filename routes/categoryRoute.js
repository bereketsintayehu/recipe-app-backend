const express = require('express');
const router = express.Router();
const categoryCtrl = require('../controllers/categoryController');

router.get('/', categoryCtrl.getAllCategorys);

router.post('/', categoryCtrl.createCategory);

router.get('/:id', categoryCtrl.getOneCategory);

router.put('/:id', categoryCtrl.updateCategory);

router.delete('/:id', categoryCtrl.deleteCategory);

module.exports = router;