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

// Back-End Routes

app.get("/", (req, res) => {
    res.render("index")
})

// a GET route scraping the divaliciousrecipes site
app.get("/scrape", (req, res) => {

    // Make a request via axios to grab the HTML body from the site of your choice
    axios.get("https://www.tasteofhome.com/collection/our-100-highest-rated-recipes-ever/").then( html => {

        const $ = cheerio.load(html.data);

        var scrapedRecipes = [];
        
        $(".listicle-page").each( (i, e) => {
            
            var recipe = {};

            recipe.title = $(e).find('h4 a').text();
            recipe.summary = $(e).find('.listicle-page__content').text();
            recipe.link = $(e).find('h4 a').attr('href');
            recipe.img = $(e).find('.image-wrapper a img').attr('src');

            
            console.log(recipe);
            scrapedRecipes.push(recipe);
            
            // use res.json(recipe)

            // db.Cookbook.create(recipe)
            // .then(
            //     dbCookbook => res.render('scrape', {recipe: dbCookbook})
            // )
            // .catch (
            //     err => console.log("err", err))
            // })

        });

        res.render('scrape', {recipe: scrapedRecipes})

    });
});

    // app.post("/saved", (req, res) => {
        // use create here
    // })

// Route to grab all recipes from db
// app.get('/allrecipes', (req, res) => {
//     db.Cookbook.find({})
//     .then(dbCookbook => res.json(dbCookbook))
//     .catch(err => res.json(err))
// });

// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});