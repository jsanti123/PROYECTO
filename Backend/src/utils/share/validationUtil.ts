import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import ResponseModel from './responseUtil';
import { StatusCodes } from "http-status-codes";
import { RESPONSE_CODES } from "./responseCodes";

export const validateResult = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json(ResponseModel.errorResponse(
            "Validation Error",
            StatusCodes.BAD_REQUEST,
            errors.array(),
            RESPONSE_CODES.BAD_REQUEST
        ));
        return;
    }
    next();
}