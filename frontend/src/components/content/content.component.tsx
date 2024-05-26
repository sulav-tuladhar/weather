function ContentComponent(
    { data, deg, kph, changeWindSpeed, changeTempUnit }
        :
        {
            data:
            {
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
                wind_mph: number
            },
            deg: boolean,
            kph: boolean,
            changeWindSpeed: () => void,
            changeTempUnit: () => void
        }
) {
    return (
        <div className="flex gap-10 items-center">
            <div className="">
                <img src={data.condition_img} alt="temp-logo" className="h-20" />
                <div className="flex gap-2">
                    <h1 className="font-semibold text-6xl">{deg ? data.temp_c : data.temp_f}&deg;{deg ? 'C' : "F"} </h1>
                    <img src="/icons/change.png" alt="refresh-icon" className="h-4 mt-2 w-4 cursor-pointer" onClick={() => changeTempUnit()} />
                </div>
                <p>{data.condition}</p>
                <p className="font-semibold">{data.location}</p>
            </div>
            <div className="flex flex-col gap-10">
                <div className="flex items-center gap-2">
                    <img src="/icons/humidity.svg" alt="humidity-svg" className="h-10" />
                    <div>
                        <p className="font-semibold">{data.humidity}%</p>
                        <p className="text-sm">humidity</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <img src="/icons/wind.svg" alt="humidity-svg" className="h-10" />
                    <div>
                        <p className="font-semibold">{kph ? data.wind_kph : data.wind_mph}{kph ? ' Km/h' : "Mp/h"} </p>
                        <p className="text-sm">Wind Speed</p>
                    </div>
                    <img src="/icons/change.png" alt="refresh-icon" className="h-4 w-4 cursor-pointer" onClick={() => changeWindSpeed()} />
                </div>
            </div>
        </div>
    )
}

export default ContentComponent
