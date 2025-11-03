import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as branchServices from "../services/branchServices";
import { Branches } from "../../../models/branchModel";
import { successResponse } from "../../../models/responseModel"


/**
 * Get all branches
 * @param req - the express request
 * @param res - the express response
 * @param next - the express middleware chaining function
 */
export const getAllBranches = async (
    _req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const branch: Branches[] = await branchServices.getAllBranches();
        res.status(HTTP_STATUS.OK).json(
            successResponse(branch, "branches sucessfully retireved")
        );
    } catch (error: unknown) {
        next(error)
    }

};

/**
 * create branch
 * @param req - the express request
 * @param res - the express response
 * @param next - the express middleware chaining function
 */
export const createBranch = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try{
            // extracting all of the fields (destructuring)
                const {name, address, phone} = req.body;
            
                const newBranch: Branches = await branchServices.createBranch({name, address, phone});
                res.status(HTTP_STATUS.CREATED).json(
                    successResponse(newBranch, "Branch created successfully")
                );
    } catch (error: unknown) {
        next(error);
    }
};


/**
 * update branch
 * @param req - the express request
 * @param res - the express response
 * @param next - the express middleware chaining function
 */

export const updateBranch = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try{
            const {id} = req.params
            // extracting all of the fields (destructuring)
            const {name, address, phone} = req.body;

            const updatedBranch: Branches = await branchServices.updateBranch(id,{name, address, phone});
            res.status(HTTP_STATUS.OK).json(
                successResponse(updatedBranch, "Branch updated successfully")
            );
    } catch (error: unknown) {
        next(error)
    }
};




/**
 * delete branch
 * @param req - the express request
 * @param res - the express response
 * @param next - the express middleware chaining function
 */

export const deleteBranch = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const {id} = req.params;

        await branchServices.deleteBranch(id);
        res.status(HTTP_STATUS.OK).json(
            successResponse( "branch deleted successfully")
        );
    } catch (error: unknown) {
        next(error);
    }
};