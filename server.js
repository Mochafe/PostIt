const fs = require("fs");
const express = require("express");
const Model = require("./models/model").Model;
const PostModel = require("./models/postModel").PostModel;
const app = express();

const model = new Model();
const postModel = new PostModel(model.sequelize);

app.use(express.static("public"));
app.use(express.json());

app.post("/getAllPosts", (req, res) => {
    postModel.getAllPosts().then((response) => {
        let buff = [];

        response.forEach(post => {
            buff.push({
                title: post.dataValues.title,
                message: post.dataValues.message,
                author: post.dataValues.author
            });
        });
        
        res.send(buff);
    });
});

app.post("/addPost", (req, res) => {

    if(typeof(req.body.title) == "undefined" || typeof(req.body.message) == "undefined") {
        res.send("/addPost");
        return;
    }
    if(req.body.title == "" || req.body.message == "") {
        res.send("/addPost");
        return;
    }


    try {
        postModel.addPost(req.body.title, req.body.message, (req.body.author == "") ? null : req.body.author).then(() => {
            res.send("/");
        });
    } catch(err) {
        console.log("/addPost : " + err);
    } 
});

app.listen(8080, () => {
    console.log("server started on port : " +  8080);
});