var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new NotesSchema object
// This is similar to a Sequelize model
var NotesSchema = new Schema({
  comment: String,
});

// This creates our model from the above schema, using mongoose's model method
var Notes = mongoose.model("Notes", NotesSchema);

// Export the Notes model
module.exports = Notes;
