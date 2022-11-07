const router = require("express").Router();
const User = require("../utils/models/User");
const redis = require("redis");

const redisClient = redis.createClient({
    host: "20.102.78.162",
    port: "6379"
});
redisClient.on('connect', () => console.log('Connected!'));
redisClient.connect();

async function cache(req, res, next) {
    console.log("Inside Get Profile Cache");
    const { userId } = req.query;
    console.log(userId);
    const value = await redisClient.get(userId);
    if (value !== null) {
        res.send(JSON.parse(value));
    } else {
        next();
    }
}

router.get("/getProfile", cache, async (req, res) => {
    console.log("Inside Get Profile Data");
    User.findById(req.query.userId, function (err, userInfo) {
        if (err) {
            res.status(400).send(err);
        } else {
            redisClient.setEx(req.query.userId, 3600, JSON.stringify(userInfo));
            res.status(200).send({ "userId": userInfo._id, "username": userInfo.username, "email": userInfo.email, "role": userInfo.role, "tags": userInfo.tags });
        }
    })
});

router.post("/editProfile", (req, res) => {
    User.findByIdAndUpdate(req.body.userId, {
        username: req.body.username,
        email: req.body.email,
        role: req.body.role,
        tags: req.body.tags,
    }, { new: true }, function (err, userInfo) {

        if (err) {
            res.status(400).send("Editing Profile failed");
        } else {
            redisClient.setEx("" + userInfo._id, 3600,JSON.stringify(userInfo));
            res.status(200).send({ "userId": userInfo._id, "username": userInfo.username, "email": userInfo.email, "role": userInfo.role, "tags": userInfo.tags });
        }
    })
})

module.exports = router;
