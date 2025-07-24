'use strict';

var express = require('express');
var mongoose = require('mongoose');
var ansiColors = require('ansi-colors');

function connectDB() {
    return mongoose.connect("mongodb://47.121.133.92:27017/mySelf", {
        dbName: "admin",
        user: "cai",
        pass: "201031",
    });
}

const app = express();
app.use(express.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
    next();
});
connectDB()
    .then(() => {
    console.log(ansiColors.green("Database connected successfully✅"));
    app.listen(3000, () => {
        console.log(ansiColors.green("Server is running on port 3000✅"));
    });
})
    .catch((err) => {
    console.log(ansiColors.red("Database connection failed❌"), err);
});
//# sourceMappingURL=index.js.map
