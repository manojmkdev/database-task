// models/Post.js
// This file defines the Mongoose Schema and Model for a "Post"

const mongoose = require('mongoose');

// Create a Schema with title and content as String datatype
// (as required by the assignment)
const postSchema = new mongoose.Schema({
    title: String,
    content: String
});

// Create a Model from the above schema
// The model name "Post" will create a "posts" collection in MongoDB
const Post = mongoose.model('Post', postSchema);

// Export the model so it can be used in routes
module.exports = Post;
