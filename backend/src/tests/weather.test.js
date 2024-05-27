const request = require('supertest');
const app = require('../app');
const { myDataSource } = require('../dataSource');
require("dotenv").config();

myDataSource
    .initialize()
    .then(() => console.log("Database Connected"))
    .catch(err => console.log("Error while connecting to database ", err))
