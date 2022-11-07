const mongoose = require("../database");

const userSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        auto: true,
    },
    username: {
        type: String,
        required: true,
        max: 255,
    },
    email: {
        type: String,
        required: true,
        max: 255,
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024,
    },
    role: {
        type: String,
        required: true,
        max: 255,
    },
    tags: {
        type: Array,
        default: []
    }
});

module.exports = mongoose.model("User", userSchema);