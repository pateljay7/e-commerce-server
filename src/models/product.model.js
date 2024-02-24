const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 100,
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 1000,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,
    },
    category: {
        type: String,
        required: true,
        enum: ['Electronics', 'Clothing', 'Books', 'Other'],
    },
    manufacturer: {
        type: String,
        trim: true,
        maxlength: 100,
    },
    images: {
        type: [{
            type: String,
        }],
        validate: {
            validator: function (images) {
                return images && images.length > 0;
            },
            message: 'At least one image is required.'
        }
    }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
