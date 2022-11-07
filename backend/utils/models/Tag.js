const mongoose = require("../database");

const tagSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        auto: true,
    },
    tagName: {
        type: String,
        max: 255,
        required: true,
    }
});

module.exports = mongoose.model("Tag", tagSchema);