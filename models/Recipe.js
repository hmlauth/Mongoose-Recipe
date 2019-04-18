var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new RecipeSchema object
// This is similar to a Sequelize model
var RecipeSchema = new Schema({
  title: String,
  summary: String,
});

// This creates our model from the above schema, using mongoose's model method
var Recipe = mongoose.model("Recipe", RecipeSchema);

// Export the Recipe model
module.exports = Recipe;
