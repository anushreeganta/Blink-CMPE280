const express = require("express");
const cors = require("cors");
const app = express();

const mongoose = require("./utils/database");

const authentication = require("./routes/authentication");
const tags = require("./routes/tags");
const posts = require("./routes/posts");
const profile = require("./routes/profile");

app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "DELETE"],
        credentials: true,
    })
);

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send("Express Server Started");
});

app.listen(3001, () => {
    console.log("Express Server started in port 3001");
})

app.use("/api", authentication);
app.use("/api", tags);
app.use("/api", posts);
app.use("/api", profile);