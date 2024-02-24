const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());


app.get('/health', (req, res, next) => {
    res.send('Server is running').status(200);
});

module.exports = { app };