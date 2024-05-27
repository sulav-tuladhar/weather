import { NextFunction, Request, Response } from "express";
import { GET } from "../../utils/httpClient";
import customError from "../../helpers/customError";
import axios from "axios";
import api_error from "../../helpers/api_error";
import { Weather } from "../../entities/weather.entity";
import map_weather_req from "../../helpers/map_weather_req";
import { repo } from "../../helpers/repo";

export const getWeatherInfo = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const searchParams = req.query.q;
        // const data = await axios.get(`${process.env.BASE_URL}q=${searchParams}`)
        const data = await GET(`${process.env.BASE_URL}q=${searchParams}`)
        const weatherInfo = data.data;      
        if(!weatherInfo){
            throw customError("Weather data not found", 404)
        }
        var newWeatherInfo = new Weather();
        const mapped_data = map_weather_req(newWeatherInfo, weatherInfo);
        const savedData = await repo.weatherRepo.save(mapped_data);
        res.status(200).json({
            data: savedData,
            status: 200
        })
    }catch(err: any){
        console.log(err.response.data.error)
        if(err.response.data){
            const error = api_error(err.response.data.error)
            return next({
                message: error.message,
                status: error.code
            })
        }
        return next(err)
    }
}
