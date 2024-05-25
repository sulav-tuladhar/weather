import { ExtendedError } from "./interfaces";

export default function customError(errorMsg: string, status: number){
    const error = new Error(errorMsg) as ExtendedError;
    error.status = status;
    return error;
}