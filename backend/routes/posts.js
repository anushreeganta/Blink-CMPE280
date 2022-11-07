const router = require("express").Router();
const mongoose = require("../utils/database");
const Post = require("../utils/models/Post");
const User = require("../utils/models/User");
const Answer = require("../utils/models/Answer");

router.post("/createPost", (req, res) => {
    const post = new Post({
        userId: mongoose.Types.ObjectId(req.body.userId),
        header: req.body.postHeader,
        body: req.body.postBody,
        tags: req.body.postTags,
    });
    post.save(function (err, postSaved) {
        if (err) {
            res.status(400).send("Post Creation unsuccessful");
        } else {
            res.status(200).json({
                message: "Post Creation Successful",
                userId: postSaved.userId,
                header: postSaved.header,
                body: postSaved.body,
                tags: postSaved.tags,
                id: postSaved._id,
            });
        }
    });
});

router.post("/editPost", (req, res) => {
    Post.findByIdAndUpdate(req.body.postId, {
        header: req.body.postHeader,
        body: req.body.postBody,
        tags: req.body.postTags,
    }, { new: true }, function (err, postSaved) {
        if (err) {
            res.status(400).send("Post Editing unsuccessful");
        } else {
            res.status(200).json({
                message: "Post Editing Successful",
                userId: postSaved.userId,
                header: postSaved.header,
                body: postSaved.body,
                tags: postSaved.tags,
                id: postSaved._id,
            });
        }
    })
});

router.get("/getPostsByUserPref", async (req, res) => {
    let user = await User.findById(req.query.userId);
    let post = await Post.find({
        tags: {
            "$in": user.tags
        }
    });
    res.status(200).send(post);
});

router.get("/getPostsByTag", async (req, res) => {
    let posts = await Post.find({
        tags: {
            "$in": req.query.tag
        }
    });
    res.status(200).send(posts);
});

router.delete("/deletePost", (req, res) => {
    console.log("Inside Delete Post");
    Post.findByIdAndDelete(req.body.postId, function (err, docs) {
        if (err) {
            res.status(400).send(err);
        } else {
            res.status(200).json({ message: docs });
        }
    })
});


router.post("/answerPost", (req, res) => {
    const answer = new Answer({
        answer: req.body.answer,
        postId: req.body.postId,
    });
    answer.save(function (err, answerSaved) {
        if (err) {
            res.status(400).send(err);
        } else {
            Post.findByIdAndUpdate(req.body.postId, { $push: { answer: answerSaved._id } }, {new: true}, function (err1, postUpdated) {
                if (err1) {
                    res.status(400).send(err1);
                } else {
                    res.status(200).send(postUpdated);
                }
            });
        }
    });
});

router.get("/getAnswerForPost", async (req,res)=>{
    Answer.find({ postId: req.query.postId}, function(err, answers){
        if(err){
            res.status(400).send("Error occured"+err);
        }else{
            res.status(200).send(answers);
        }
    })
})

router.get("/searchPost", async (req,res)=>{
    let user = await User.findById(req.query.userId);
    let post = await Post.find({
        //$text: { $search: req.query.searchString},
        header: new RegExp(req.query.searchString),
        tags: {
            "$in": user.tags
        }
    });
    res.status(200).send(post);
})

module.exports = router;