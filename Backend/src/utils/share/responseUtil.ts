import { StatusCodes } from "http-status-codes";

export interface ResponseInterface {
    success: boolean;
    message: string;
    data?: any;
    errors?: any;
    statusCode?: number;
    errorCode?: string;
}

class ResponseModel {
    public static successResponse(message: string, data: any, statusCode: number = StatusCodes.OK): ResponseInterface {
        return {
            success: true,
            message,
            data,
            statusCode,
        };
    }
    public static errorResponse(message: string, errors?: any, statusCode?: number, errorCode?: string): ResponseInterface {
        return {
            success: false,
            message,
            errors,
            statusCode,
            errorCode,
        };
    }
}

export default ResponseModel;