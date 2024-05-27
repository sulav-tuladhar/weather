export interface ExtendedError extends Error {
    status: number
}

export interface WeatherData {
    name: string,
    local_time: string,
    temp_c: number,
    temp_f: number,
    is_day: boolean,
    condition: string,
    condition_img: string,
    wind_mph: string,
    wind_kph: string,
    humidity: number,
    isOldData?: boolean
}

export interface APIERROR {
    message: string;
    code: number
}