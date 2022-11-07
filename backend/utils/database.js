const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose.connect("", {
    maxPoolSize: 10,
    minPoolSize: 5,
}).then(() => {
    console.log("Mongoose is connected");
}, (err) => {
    console.log("Mongoose is not connected. " + err);
})

module.exports = mongoose;
