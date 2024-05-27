import { NextFunction, Request, Response } from "express";
import { GET } from "../../utils/httpClient";
import customError from "../../helpers/customError";
import api_error from "../../helpers/api_error";
import { Weather } from "../../entities/weather.entity";
import map_weather_req from "../../helpers/map_weather_req";
import { repo } from "../../helpers/repo";
import moment from "moment";
import { myDataSource } from "../../dataSource";
import { WeatherData } from "../../helpers/interfaces";
const dns = require('dns').promises;

const checkInternet = () => {
    return dns.lookup('google.com')
        .then(() => true)
        .catch(() => false);
};

// Function to query from the database to get the existing data
const fetchDataFromDatabase = async (date: string, cityName: string) => {
    const data = await myDataSource
        .getRepository(Weather)
        .createQueryBuilder("weather")
        .where("weather.createdAt = :date", { date: date })
        .andWhere("weather.location like  :location", { location: `%${cityName}%` })
        .getOne()
    return data;
}

export const getWeatherInfo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const searchParams = req.query.q as string;
        const todayDate = moment().format("YYYY/MM/DD");
        var data: WeatherData;

        // Checking internet connectivity
        const isInternetConnected = await checkInternet();
        if (!isInternetConnected) {
            data = await fetchDataFromDatabase(todayDate, searchParams) as any
            data && (data.isOldData = true)
        } else {
            const resData = await GET(`${process.env.BASE_URL}q=${searchParams}`)
            const weatherInfo = resData.data;
            if (!weatherInfo) {
                throw customError("Weather data not found", 404)
            }
            var newWeatherInfo = new Weather();
            weatherInfo.createdAt = todayDate;
            const mapped_data = map_weather_req(newWeatherInfo, weatherInfo);
            data = await repo.weatherRepo.save(mapped_data) as any;
        }
        if (!data) {
            throw customError("Weather data not found", 404)
        }
        res.status(200).json({
            data,
            status: 200
        })
    } catch (err: any) {
        if (err?.response?.data) {
            const error = api_error(err.response.data.error)
            return next({
                message: error.message,
                status: error.code
            })
        }
        return next(err)
    }
}
