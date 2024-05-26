import { Weather } from "../entities/weather.entity";

export default function(newWeather: Weather, weatherData: any){
    if(weatherData.location.name)
        newWeather.location = weatherData.location.name;
    if(weatherData.location.localtime)
        newWeather.local_time = weatherData.location.localtime;
    if(weatherData.current.temp_c)
        newWeather.temp_c = weatherData.current.temp_c;
    if(weatherData.current.temp_f)
        newWeather.temp_f = weatherData.current.temp_f;
    if(weatherData.current.is_day)
        newWeather.is_day = weatherData.current.is_day;
    if(weatherData.current.condition.text)
        newWeather.condition = weatherData.current.condition.text;
    if(weatherData.current.condition.icon)
        newWeather.condition_img = weatherData.current.condition.icon;
    if(weatherData.current.wind_kph)
        newWeather.wind_kph = weatherData.current.wind_kph;
    if(weatherData.current.wind_mph)
        newWeather.wind_mph = weatherData.current.wind_mph;
    if(weatherData.current.humidity)
        newWeather.humidity = weatherData.current.humidity;

    return newWeather;
}