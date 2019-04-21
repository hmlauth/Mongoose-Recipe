var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models"); //require all models in models folder

var PORT = process.env.PORT || 3000; //define port

var app = express(); //initialize Express

// Configure middleware

app.use(logger("dev")); // Use morgan logger for logging requests
app.use(express.urlencoded({ extended: true })); // Parse request body as JSON
app.use(express.json());
app.use(express.static("public")); // Make public a static folder

// Handlebars
var exphbs = require("express-handlebars");
app.engine(
    "handlebars",
    exphbs({
        defaultLayout: "main"
    })
);
app.set("view engine", "handlebars");

// Connect to the Mongo DB - 'recipeScraper'
mongoose.connect("mongodb://localhost/recipeScraper", { useNewUrlParser: true });

// ROUTES

app.get("/", (req, res) => {
    res.render("index")
});

// a GET route scraping the divaliciousrecipes site
app.get("/scrape", (req, res) => {

    // Make a request via axios to grab the HTML body from the site of your choice
    axios.get("https://www.tasteofhome.com/collection/our-100-highest-rated-recipes-ever/").then( html => {

        const $ = cheerio.load(html.data);

        var scrapedRecipes = [];
        // console.log(scrapedRecipes);

        $(".listicle-page").each( (i, e) => {
            
            var recipe = {};
            recipe.id = $(e).find(".listicle-page__count-current").text();
            recipe.title = $(e).find('h4 a').text();
            recipe.summary = $(e).find('.listicle-page__content').text();
            recipe.link = $(e).find('h4 a').attr('href');
            recipe.img = $(e).find('.image-wrapper a img').attr('src');

            // console.log(recipe);
            scrapedRecipes.push(recipe);

        });

        res.render('scrape', {recipe: scrapedRecipes})

    }).catch(err => console.log(err));

});

app.post("/saved", (req, res) => {

    // create a 'Cookbook' using the 'savedRecipe' object sent via post request from the front-end. 
    db.Cookbook.create(req.body)
    // view the added result in the console.
    .then (dbCookbook => console.log("Successfully Saved!"))
    .catch (err => console.log("err", err))

})

// Route to grab all recipes from db
app.get('/allrecipes', (req, res) => {
    db.Cookbook.find({})
    .then(dbCookbook => res.render('allrecipes', {recipe: dbCookbook}))
    .catch(err => res.json(err))
});

// route for saving recipe's associated note
app.post('/addnote/:id', (req, res) => {
    console.log('req.body', req.body);
    db.Notes.create(req.body) 
    .then( dbNotes => {
        console.log('dbNotes', dbNotes);
        return db.Cookbook.findOneAndUpdate( 
            { _id: req.params.id }, 
            {$push: {notes: dbNotes._id} }, 
            {new: true}
        )
    })
    .then( dbCookbook => res.json(dbCookbook))
    .catch(err => res.json(err));
});

// route for populating notes associated with recipe
app.get('/addnote/:id', (req, res) => {
    db.Cookbook.find({_id: req.params.id})
    .populate("notes")
    .then( dbCookbook => res.json(dbCookbook))
});

app.delete('/deleterecipe/:id', (req, res) => {
    db.Cookbook.remove({_id: req.params.id})
    .then(dbCookbook => res.json(dbCookbook))
});

app.delete('/deletenote/:id', (req, res) => {
    db.Notes.remove({_id: req.params.id})
    .then(dbNote => res.json(dbNote))
})
// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});