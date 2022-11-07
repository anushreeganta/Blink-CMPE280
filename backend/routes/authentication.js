const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../utils/models/User");
const redis = require("redis");

const saltRounds = 10;

const redisClient = redis.createClient({
    host: "20.102.78.162",
    port: "6379"
});
redisClient.on('connect', () => console.log('Connected!'));
redisClient.connect();

router.post("/register", (req, res) => {
    console.log("Inside Register API");

    User.findOne({ email: req.body.email }, (error, userFound) => {
        if (error) {
            res.status(400).end();
        }
        if (userFound) {
            res.status(400).send("User already present");
        } else {
            const password = req.body.password;
            bcrypt.hash(password, saltRounds, function (err, hash) {
                const user = new User({
                    email: req.body.email,
                    username: req.body.username,
                    password: hash,
                    role: req.body.role,
                    tags: req.body.tags,
                });

                user.save(function (err, savedUser) {
                    if (err) {
                        res.status(400).end();
                    } else {
                        redisClient.set(""+savedUser._id, JSON.stringify(savedUser));
                        res.status(200).json({ email: req.body.email, id: savedUser._id, role: savedUser.role });
                    }
                })
            });
        }
    });
});


router.post("/login", (req, res) => {
    console.log("Inside Login API");

    User.findOne({ email: req.body.email }, (error, userFound) => {
        if (error) {
            res.status(400).end();
        }
        if (userFound) {
            bcrypt.compare(req.body.password, userFound.password, function (err, result) {
                if (result) {
                    res.status(200).json({ email: req.body.email, id: userFound._id, role: userFound.role });
                } else {
                    res.status(400).send("Invalid Credentails entered!");
                }
            })
        }else{
            res.status(400).send("User Not found");
        }


    });

})

module.exports = router;
