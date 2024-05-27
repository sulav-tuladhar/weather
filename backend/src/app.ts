import { NextFunction, Request, Response } from "express";
import { myDataSource } from "./dataSource";

const express = require('express')
const app = express();
const PORT = 9191;
const cors = require('cors');
const weatherRoute = require('./modules/weather/weather.router');

require('dotenv').config();

app.use(cors({
    credentials: true,
    origin: true
}))

myDataSource    
    .initialize()
    .then(() => console.log("Database Connected"))
    .catch(err => console.log("Error while connecting to database ", err))

// Inbuilt middleware
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

app.use('/', weatherRoute);

// 404 error handler
app.use(function(req: Request, res: Response, next: NextFunction){
    next({
        message: "Page not found",
        status: 404
    })
})

// Error handler middleware
app.use(function(err: any, req: Request, res: Response, next: NextFunction){
    res.status(err.status || err);
    res.json({
        message: err.message || err,
        status: err.status || 500
    })
})

app.listen(PORT, () => console.log(`Server is listening at PORT ${PORT}`))