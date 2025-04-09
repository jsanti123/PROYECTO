import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import ResponseModel from './responseUtil';

export const validateResult = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json(ResponseModel.errorResponse("Validation Error", errors.array() , 400, "VALIDATION_ERROR"));
        return;
    }
    next();
}