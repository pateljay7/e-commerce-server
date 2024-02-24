const express = require('express');
const cors = require('cors');
const { ProductRouter } = require('./product.router');
const helmet = require('helmet');
const app = express();
app.use(cors());
app.use(helmet());

app.use(express.urlencoded({ extended: true }));

app.use(express.json());


app.get('/health', (req, res, next) => {
    res.send('Server is running').status(200);
});
app.use('/uploads', express.static('uploads'));

app.use('/product', ProductRouter);
module.exports = { app };