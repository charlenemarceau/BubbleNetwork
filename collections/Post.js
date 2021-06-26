const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        trim: true,
        required: true,
        max: 300,
    },
    picture: {
        type: String,
    },
    comments: {
        type: [{
            commenterId: String,
            commenterPseudo: String,
            text: String,
            timestamp: Number,
        }],
        required: true,
    },
    },
    {
        timestamps: true,
    }
);

const PostModel = mongoose.model('post', postSchema)
module.exports = PostModel;