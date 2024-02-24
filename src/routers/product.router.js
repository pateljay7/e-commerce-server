
const multer = require('multer');
const path = require('path'); const express = require('express');
const { createProduct, findProduct, findProducts, updateProduct, deleteProduct } = require('../controllers/product.controller');
const router = new express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

router.post('/', upload.array('images'), createProduct);
router.get('/', findProducts);
router.get('/:id', findProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = { ProductRouter: router };