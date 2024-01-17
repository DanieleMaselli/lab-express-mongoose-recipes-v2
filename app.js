const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const Recipe = require('./models/Recipe.model')
const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

mongoose
  .connect(MONGODB_URI)
  .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to mongo", err));

// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post('/recipes', (res,req) => {
    
    Recipe.create({
        title: req.body.title,
        level: req.body.level,
        ingredients: req.body.level,
        cuisine: req.body.cuisine,
        dishType: req.body.dishType,
        image: req.body.image,
        duration: req.body.duration,
        creator: req.body.creator
    })
    .then((createdRecipe)=> {
        res.status(201).json(createdRecipe)
    })
    .catch((error)=> {
        res.status(500).json({message: 'internal server error'})
    })
    
})

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get('/recipes',(res,req) => {

    Recipe.find()
        .then((allRecipes)=> {
            res.status(200).json(allRecipes)
        })
        .catch((error)=> {
            res.status(500).json({message: "error"})
        })
})

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get('/',(res,req) => {
    
})


//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route


//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route

// Start the server
app.listen(5000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
