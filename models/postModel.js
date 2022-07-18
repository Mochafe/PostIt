const { Sequelize, DataTypes } = require('sequelize');

class PostModel {
    /**
     * 
     * @param {!Sequilize} model 
     */
    constructor(sequelize) {
        if(typeof(sequelize) === "undefined") throw new Error("sequelize argument in constructor is not defined");

        this.post = sequelize.define("post", {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            title: {
                type: DataTypes.STRING(256),
                allowNull: false
            },
            message: {
                type: DataTypes.STRING(10240),
                allowNull: false
            },
            author: {
                type: DataTypes.STRING(64),
                allowNull: true
            }
        }, {
            //options
        });

        this.syncAlter();
    }

    syncAlter() {
        this.post.sync({ alter: true });
    }

    /**
     * 
     * @param {String} title
     * @param {String} message 
     * @param {?String} author 
     */
    async addPost(title, message, author = null) {
            if(title == "" || message == "") throw new Error("addPost function: invalid argument");
            await this.post.create({
                title: title,
                message: message,
                author: author
            });
    }

    /**
     * 
     * @returns Return all posts
     */
    async getAllPosts() {
        return this.post.findAll();
    }

    /**
     * 
     * @param {Number}id of an post
     * @returns Return an post
     */
    async getPost(id) {
        return this.post.findAll({
            where: {
                id: id
            }
        })
    }
}

module.exports = {
    PostModel: PostModel
}