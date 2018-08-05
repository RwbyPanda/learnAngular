const express = require("express");
const router = express.Router();

const checkAuth = require('../middleware/check-auth')

const Recipe = require("../models/recipes")

router.get('/recipes', checkAuth, (req, res, next) => {
    Recipe.find().then(recipes => {
        res.json({recipes: recipes})
    })
})

router.put("/recipes", checkAuth, (req, res, next) => {

        Recipe.remove({}).then(result => {
            console.log(result);
        })
        for(let i = 0; i < req.body.recipes.length; i++) {
            Recipe.create(req.body.recipes[i]).then(recipe => {
                console.log(recipe);
            })
        }
        
    
   
})

module.exports = router;