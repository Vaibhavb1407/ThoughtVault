const asyncHandler = require('express-async-handler');
const Thought = require('../models/Thought');
const User = require('../models/User');

// @desc    Get thoughts
// @route   GET /api/thoughts
// @access  Private
const getThoughts = asyncHandler(async (req, res) => {
    const thoughts = await Thought.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(thoughts);
});

// @desc    Set thought
// @route   POST /api/thoughts
// @access  Private
const setThought = asyncHandler(async (req, res) => {
    if (!req.body.title || !req.body.content) {
        res.status(400);
        throw new Error('Please add a title and content');
    }

    const thought = await Thought.create({
        user: req.user.id,
        title: req.body.title,
        content: req.body.content,
        mood: req.body.mood,
        tags: req.body.tags,
    });

    res.status(200).json(thought);
});

// @desc    Update thought
// @route   PUT /api/thoughts/:id
// @access  Private
const updateThought = asyncHandler(async (req, res) => {
    const thought = await Thought.findById(req.params.id);

    if (!thought) {
        res.status(400);
        throw new Error('Thought not found');
    }

    // Check for user
    if (!req.user) {
        res.status(401);
        throw new Error('User not found');
    }

    // Make sure the logged in user matches the thought user
    if (thought.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    const updatedThought = await Thought.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    res.status(200).json(updatedThought);
});

// @desc    Delete thought
// @route   DELETE /api/thoughts/:id
// @access  Private
const deleteThought = asyncHandler(async (req, res) => {
    const thought = await Thought.findById(req.params.id);

    if (!thought) {
        res.status(400);
        throw new Error('Thought not found');
    }

    // Check for user
    if (!req.user) {
        res.status(401);
        throw new Error('User not found');
    }

    // Make sure the logged in user matches the thought user
    if (thought.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    await thought.deleteOne();

    res.status(200).json({ id: req.params.id });
});

module.exports = {
    getThoughts,
    setThought,
    updateThought,
    deleteThought,
};
