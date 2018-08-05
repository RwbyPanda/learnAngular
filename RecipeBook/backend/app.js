var express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require("cors");

var userRoutes = require('./routes/user');
const recipeRoutes = require("./routes/recipes")

mongoose.connect(process.env.DB)
    .then(() => {
        console.log("connected to db");
    })
    .catch(() => {
        console.log("Connection failed");
    })

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
})


app.use('/api/user', userRoutes);
app.use('/api', recipeRoutes);

module.exports = app;