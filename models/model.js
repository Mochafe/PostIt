const {Sequelize, DataTypes} = require('sequelize');
const dbConfig = require("../database.config.json");

class Model {
    constructor() {
        this.sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
            host: dbConfig.host,
            dialect: dbConfig.dialect,
            pool: dbConfig.pool
        });
    }

    async authenticate() {
        try {
            await this.sequelize.authenticate();
            console.log('Database: Connection has been established successfully.');
          } catch (error) {
            console.error('Database: Unable to connect to the database:', error);
          }
    }
}

module.exports = {
    Model: Model
}

