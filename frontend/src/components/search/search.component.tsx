import { useState } from "react"

function SearchComponent({ submit }: { submit: (e: React.SyntheticEvent ,city: string) => void }) {
    const [city, setCity] = useState("");

    return (
        <div className="flex items-center bg-white rounded-full px-4 text-black">
            <input
                id="city-name"
                type='text'
                placeholder='Please enter city name'
                className="p-4  rounded-full w-[20rem] outline-none"
                required
                onChange={(e) => setCity(e.target.value)}
            />
            <img src="/icons/search.png" alt="search-icon" className="h-8 cursor-pointer" onClick={(e) => submit(e, city)} />
        </div>
    )
}

export default SearchComponent
