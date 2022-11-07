const mongoose = require("../database");

const answerSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        auto: true,
    },
    answer: {
        type: String,
        required: true,
    },
    postId: {
        type: mongoose.Types.ObjectId,
        required: true,
    }
});

module.exports = mongoose.model("Answer", answerSchema);