const mongoose = require('mongoose');

const thoughtSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: [true, 'Please add a title']
    },
    content: {
        type: String,
        required: [true, 'Please add content']
    },
    mood: {
        type: String,
        enum: ['happy', 'sad', 'motivated', 'neutral'],
        default: 'neutral'
    },
    tags: {
        type: [String],
        default: []
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Thought', thoughtSchema);
