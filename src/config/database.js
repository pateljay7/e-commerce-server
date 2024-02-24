const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log("DB Connected");
});

mongoose.connection.on('error', (error) => {
    console.log("Error while connecting with DB", error);
});