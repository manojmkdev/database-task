const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// GET route - '/getPosts'
// Displays all the available posts from the mongodb
// Uses the find() mongodb command
// -----------------------------------------------------
router.get('/getPosts', async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// -----------------------------------------------------
// POST route - '/addPosts'
// Adds a new post into the mongodb using save()
// -----------------------------------------------------
router.post('/addPosts', async (req, res) => {
    try {
        // Get title and content from the request body
        const { title, content } = req.body;

        // Create a new instance of the Post model
        const newPost = new Post({
            title: title,
            content: content
        });

        // save() command stores the document in mongodb
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// -----------------------------------------------------
// DELETE route - '/delPosts'
// Deletes a post from mongodb using findByIdAndDelete()
// Expects the post id to be sent in the request body: { "id": "..." }
// -----------------------------------------------------
router.delete('/delPosts', async (req, res) => {
    try {
        const { id } = req.body;

        // findByIdAndDelete() removes the document matching the given id
        const deletedPost = await Post.findByIdAndDelete(id);

        if (!deletedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(200).json({
            message: 'Post deleted successfully',
            deletedPost
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// -----------------------------------------------------
// iv) PATCH route - '/post/:id'
// Updates a particular post identified by its id in the URL
// -----------------------------------------------------
router.patch('/post/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        // findByIdAndUpdate() finds the post by id and updates only
        // the fields provided in the request body.
        // { new: true } returns the updated document instead of the old one.
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { $set: { title, content } },
            { new: true, runValidators: true }
        );

        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
