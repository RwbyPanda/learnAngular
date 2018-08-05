const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
    name: String,
    description: String,
    imagePath: String,
    ingredients: Array
});

module.exports = mongoose.model("recipe", recipeSchema);