const fs = require("fs");
const express = require("express");
const Model = require("./models/model").Model;
const PostModel = require("./models/postModel").PostModel;
const app = express();

const model = new Model();
const postModel = new PostModel(model.sequelize);

app.use(express.static("public"));
app.use(express.json());

app.get("/getAllPosts", (req, res) => {
    postModel.getAllPosts().then((response) => {
        let buff = [];

        response.forEach(post => {
            buff.push({
                id: post.dataValues.id,
                title: post.dataValues.title,
                message: post.dataValues.message,
                author: post.dataValues.author
            });
        });
        
        res.send(buff);
    });
});

app.get("/getPost", (req, res) => {
    postModel.getPost(req.query.id).then((response) => {
        res.send({
            title: response[0].dataValues.title,
            message: response[0].dataValues.message,
            author: response[0].dataValues.author
        });
    });
});

app.post("/updatePost", (req, res) => {
    if(typeof(req.body.title) == "undefined" || typeof(req.body.message) == "undefined") {
        res.send(`/changePost.html?id=${req.query.id}`);
        return;
    }
    if(req.body.title == "" || req.body.message == "") {
        res.send(`/changePost.html?id=${req.query.id}`);
        return;
    }

    console.log(req.body);

   try {
        postModel.updatePost(req.body).then((result) => {
            console.log(result);
            res.send("/");
        });
        
    } catch(err) {
        console.log("/changePost : " + err);
    }
});

app.delete("/deletePost", (req, res) => {
    try {
        postModel.deletePost(req.query.id).then(() => {
            res.send("/");
        });
    } catch(err) {
        console.log("/deletePost" + err);
    }
    
});

app.post("/addPost", (req, res) => {

    if(typeof(req.body.title) == "undefined" || typeof(req.body.message) == "undefined") {
        res.send("/addPost.html");
        return;
    }
    if(req.body.title == "" || req.body.message == "") {
        res.send("/addPost.html");
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

app.get("*", (req, res) => {
    res.send("Page 404");
})

app.listen(8080, () => {
    console.log("server started on port : " +  8080);
});