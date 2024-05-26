var router = require('express').Router();

const weatherController = require('./weather.controller');

router.route('/get-weather')
    .get(weatherController.getWeatherInfo)

module.exports = router;