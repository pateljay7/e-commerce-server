const { default: mongoose } = require("mongoose");
const Product = require("../models/product.model");
const path = require("path");
const fs = require('fs');
const createProduct = async (req, res, next) => {
    try {
        const images = req.files.map(file => '/uploads/' + file.filename);
        const newProduct = new Product({ ...req.body, images });
        const validationError = newProduct.validateSync();
        if (validationError) {
            res.status(400).json({ error: validationError.message, success: false });
            return;
        }
        const savedProduct = await newProduct.save();
        res.send({ success: true, data: savedProduct }).status(201);
    } catch (error) {
        console.log("error", error.message);
        res.status(500).send({ success: false, error: error.message });
        next(error);
    }
};
const findProduct = async (req, res, next) => {
    try {
        if (!req.params.id) throw new Error('Missing id in url params');
        if (!mongoose.isValidObjectId(req.params.id)) throw new Error('Invalid activity ID');
        const product = await Product.findById(req.params.id);
        if (product)
            res.send({ success: true, data: product });
        else
            res.status(400).send({ success: false, error: 'Invalid product id' });
    } catch (error) {
        console.log("error", error.message);
        res.status(500).send({ success: false, error: error.message });
        next(error);
    }
};
const findProducts = async (req, res, next) => {
    try {
        const products = await Product.find({});
        res.send({ success: true, data: products }).status(200);
    } catch (error) {
        console.log("error", error.message);
        res.status(500).send({ success: false, error: error.message });
        next(error);
    }
};
const updateProduct = async (req, res, next) => {
    try {
        if (!req.params.id) throw new Error('Missing id in url params');
        if (!mongoose.isValidObjectId(req.params.id)) throw new Error('Invalid product ID');
        const images = req.files.map(file => '/uploads/' + file.filename);
        const product = { ...req.body, images };
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, product, { new: true });
        if (updatedProduct)
            res.send({ success: true, data: updatedProduct });
        else
            res.status(400).send({ error: 'Invalid Product id', success: false });

    } catch (error) {
        console.log("error", error.message);
        res.status(500).send({ success: false, error: error.message });
        next(error);
    }
};
const deleteProduct = async (req, res, next) => {
    try {
        if (!req.params.id) throw new Error('Missing id in url params');
        if (!mongoose.isValidObjectId(req.params.id)) throw new Error('Invalid product ID');
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (deletedProduct)
            res.send({ success: true, data: { message: 'product deleted successfully' } });
        else
            res.status(401).send({ success: false, error: "Invalid product id" });
    } catch (error) {
        res.status(500).send({ success: false, error: error.message });
        next(error);
    }
};

const deleteImage = async (req, res, next) => {
    // const { filename } = req.params;
    const { id, filename } = req.query;
    console.log(id, filename);
    const currDir = __dirname;
    const dir = path.join(currDir, '../../');
    const imagePath = path.join(dir, 'uploads', filename);

    try {
        // await fs.access(imagePath, (error) => {
        //     console.log("error,", error);
        // });

        await fs.unlink(imagePath, async () => {
            // res.json({ success: true, message: 'Image deleted successfully' });
            const up = await Product.findByIdAndUpdate(id,
                { $pull: { images: filename } }, { new: true }
            );
            res.send({ data: 'Image deleted', success: true });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to delete image' });
    }
};

module.exports = { createProduct, findProduct, findProducts, updateProduct, deleteProduct, deleteImage };