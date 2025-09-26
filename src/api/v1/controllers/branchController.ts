import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as branchServices from "../services/branchServices";
import { Branches } from "../../../models/branchModel"


/**
 * this will handle the request the retrieve branch records
 * @param req express request object
 * @param res express response object
 * @param next to pass errors
 */
export const getAllBranches = async (
    _req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const branch: Branches[] = await branchServices.getAllBranches();
        res.status(HTTP_STATUS.OK).json({
            message: "branches retrieved sucessfully",
            data:branch,
        });
    } catch (error: unknown) {
        next(error)
    }

};
