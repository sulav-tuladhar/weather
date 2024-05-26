import axios from 'axios';

const http = axios.create({
    baseURL: process.env.BASE_URL,
    timeout: 10000,
    timeoutErrorMessage: "Takes too long for response",
})

export const GET = (url: string, params = {}) => {
    console.log("here I am", url)
    return http.get(url, {
        params
    })
};