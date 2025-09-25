import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as employeeService from "../services/employeeServices";
import { Employees } from "../../../models/employeeModel";



export const getAllEmployees = async (
    _req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const employee: Employees[] = await employeeService.getAllEmployees();
        res.status(HTTP_STATUS.OK).json({
            message: "employees information retrieved sucessfully",
            data:employee,
        });
    } catch (error: unknown) {
        next(error)
    }

};