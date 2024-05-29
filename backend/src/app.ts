import { NextFunction, Request, Response } from "express";
import { myDataSource } from "./dataSource";

const express = require('express')
const app = express();
const PORT = 9191;
const cors = require('cors');
const weatherRoute = require('./modules/weather/weather.router');
// const { specs, swaggerUi } = require('swagger-ui-express');
import swaggerUi from 'swagger-ui-express'
import swaggerDocs from '../swagger.json'

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

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/', weatherRoute);

// 404 error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
    next({
        message: "Page not found",
        status: 404
    })
})

// Error handler middleware
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
    res.status(err.status || err);
    res.json({
        message: err.message || err,
        status: err.status || 500
    })
})

app.listen(PORT, () => console.log(`Server is listening at PORT ${PORT}`))
export default app;