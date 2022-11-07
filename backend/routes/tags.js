const router = require("express").Router();
const Tag = require("../utils/models/Tag");

router.post("/createTag", (req, res) => {
    const tagName = req.body.tagName;
    Tag.findOne({ tagName: tagName }, (error, tagFound) => {
        if (error) {
            res.status(400).end();
        }
        if (tagFound) {
            res.status(400).send("Tag Name already present");
        } else {
            const tag = new Tag({
                tagName: tagName,
            });
            tag.save(function (err) {
                if (err) {
                    res.status(400).end();
                } else {
                    res.status(200).send("Tag Successfully created");
                }
            })
        }
    })
})

router.get("/getTags", async (req, res) => {
    const tagsList = await Tag.find({}).select('tagName');
    res.status(200).send(tagsList);
})

module.exports = router;