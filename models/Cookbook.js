var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var CookbookSchema = new Schema({
  // `title` is required and of type String
  title: {
    type: String,
    required: true
  },
  summary: {
      type: String,
      required: true
  },
  // `link` is required and of type String
  link: {
    type: String,
    required: true
  },
  img: {
      type: String,
      required: false
  },
  // `Notes` is an object that stores a Notes id
  // The ref property links the ObjectId to the Notes model
  // This allows us to populate the Cookbook with an associated Notes
  notes: {
    type: Schema.Types.ObjectId,
    ref: "Notes"
  }
});

// This creates our model from the above schema, using mongoose's model method
var Cookbook = mongoose.model("Cookbook", CookbookSchema);

// Export the Cookbook model
module.exports = Cookbook;