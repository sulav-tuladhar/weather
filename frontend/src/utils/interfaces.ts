export interface Weather {
    condition: string,
    condition_img: string,
    humidity: number,
    id: number,
    is_day: number,
    local_time: string,
    location: string,
    temp_c: number,
    temp_f: number,
    wind_kph: number,
    wind_mph: number,
    isOldData?: boolean
}