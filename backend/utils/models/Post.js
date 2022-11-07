const mongoose = require("../database");

const postSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        auto: true,
    },
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    header: {
        type: String,
        max: 1024,
        required: true,
    },
    body: {
        type: String,
    },
    tags: {
        type: Array,
        default: []
    },
    answer: {
        type: Array,
        default: []
    }
});

module.exports = mongoose.model("Post", postSchema);