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

// Routes

app.get("/", (req, res) => {
    res.render("index")
})
// a GET route scraping the divaliciousrecipes site
app.get("/scrape", (req, res) => {

    // Make a request via axios to grab the HTML body from the site of your choice
    axios.get("https://www.tasteofhome.com/collection/our-100-highest-rated-recipes-ever/").then( html => {

        // console.log(html);
        const $ = cheerio.load(html.data);

        // const listicleCard = $(".listicle-page");
        // console.log(listicleCard.html());
        // console.log(listicleCard.text());
        // const cardHeadings = listicleCard.find('h4').text();
        // find and children are similar in that they find html element within the selected 'parent' html element.
        // const cardHeadings = listicleCard.children('h4').text()
        // console.log(cardHeadings);

        $(".listicle-page").each( (i, e) => {
            var recipe = {};

            recipe.title = $(e).find('h4 a').text();
            recipe.summary = $(e).find('.listicle-page__content').text();
            recipe.link = $(e).find('h4 a').attr('href');
            recipe.img = $(e).find('.image-wrapper a img').attr('src');
            // console.log("Recipe Title", recipeTitle);
            // console.log("Recipe Desc", recipeDes);
            // console.log("Recipe Link", recipeLink);
            // console.log("Recipe Img", recipeImgSrc);

            console.log("Recipe", recipe);

            db.Cookbook.create(recipe)
            .then( dbCookbook => 
                console.log("dbCookbook", dbCookbook)
            ).catch (err => 
                console.log(err)
            )
        })
        });
        
        res.send("Scrape Complete");
    })




// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});