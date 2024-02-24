const express = require('express');
const { createProduct, findProduct, findProducts, updateProduct, deleteProduct } = require('../controllers/product.controller');
const router = new express.Router();

router.post('/', createProduct);
router.get('/', findProducts);
router.get('/:id', findProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = { ProductRouter: router };