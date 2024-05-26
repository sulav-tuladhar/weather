import { useState } from "react"
import ContentComponent from "../../components/content/content.component"
import SearchComponent from "../../components/search/search.component"
import axios from "axios";
import Loadercomponent from "../../components/common/loader/loader.component";

function HomePage() {
    const [data, setData] = useState(null);
    const [isDeg, setIsDeg] = useState(true);
    const [isKph, setIsKph] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [cityName, setCityName] = useState("");
    const [error, setError] = useState("");

    const BASE_URL = 'http://localhost:9191/get-weather?q='

    const handleSubmit = async (e: React.SyntheticEvent, cityName: string) => {
        try {
            if(cityName.length == 0)
                return setError("Please enter a city")
            setError("")
            setCityName(cityName);
            setIsLoading(true)
            e.preventDefault();
            const data = await axios.get(`${BASE_URL}${cityName}`);
            setData(data.data.data);
            setIsLoading(false);
        } catch (err: any) {
            setIsLoading(false);
            if(err.response.status == 500)
                setError("Something went wrong please try again in a few minutes")
            if (err.response.data)
                setError(err.response.data.message)
        }
    }

    const changeWindSpeed = () => setIsKph(!isKph);
    const changeTempUnit = () => setIsDeg(!isDeg);

    const content = data !== null && isLoading !== true
        ? <ContentComponent data={data} deg={isDeg} kph={isKph} changeWindSpeed={changeWindSpeed} changeTempUnit={changeTempUnit} />
        : cityName.length == 0
            ? <p className="font-semibold text-md"> Please enter a city</p>
            : <Loadercomponent />

    return (
        <section className="bg-gradient-to-tl from-slate-800 text-white via-violet-500 to-zinc-400 h-[100vh] w-[100%] flex flex-col items-center justify-center gap-4">
            <SearchComponent submit={handleSubmit} />
            {
                error.length
                    ? <p className="font-semibold text-md text-red-400">{error}</p>
                    : <>{content}</>
            }
        </section>
    )
}

export default HomePage
