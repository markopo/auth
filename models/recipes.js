const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define our model
const recipesSchema = new Schema({
    title: String,
    text: String
});

// Create the model class
const ModelClass = mongoose.model('recipe', recipesSchema);

// Exoort the model
module.exports = ModelClass;