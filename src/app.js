require('../src/config/database');
const { app } = require("./routers");

app.listen(process.env.PORT, () => {
    console.log(`${process.env.NODE_ENV} Server is running on Port:: `, process.env.PORT);
});