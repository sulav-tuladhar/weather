import { APIERROR } from "./interfaces";

export default function (error: APIERROR) {
    var code: number = 0;
    var message: string = error.message
    switch (error.code) {
        case 1003:
            code = 404
            break;
        case 1005:
            code = 400
            break;
        case 1006:
            code = 404
            break;
        case 9999:
            code = 500
            break;
        default:
            code = 500
            break;
    }
    return {
        code,
        message
    }
}