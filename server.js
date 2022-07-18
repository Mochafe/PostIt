const fs = require("fs");
const express = require("express");
const Model = require("./models/model").Model;
const PostModel = require("./models/postModel").PostModel;
const app = express();

const model = new Model();
const postModel = new PostModel(model.sequelize);

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile("index.html");
});

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
    })
})

app.listen(8080, () => {
    console.log("server started on port : " +  8080);
})