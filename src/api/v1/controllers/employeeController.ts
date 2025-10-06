import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as employeeService from "../services/employeeServices";
import { Employees } from "../../../models/employeeModel";

import { successResponse } from "../../../models/responseModel";

/**
 * this will handle the request the retrieve employee records
 * @param _req express request object
 * @param res express response object 
 * @param next to pass errors
 */
export const getAllEmployees = async (
    _req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const employee: Employees[] = await employeeService.getAllEmployees();
        res.status(HTTP_STATUS.OK).json(
            successResponse(employee, "employees information retrieved sucessfully")
        );
    } catch (error: unknown) {
        next(error)
    }

};

/**
 * this will handle the request to create a new employee in the list
 * @param req express request object
 * @param res express response object
 * @param next to pass errors
 */
export const createEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try{
        if (!req.body.name) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message:"Employee name is required."
            });
        } else if (!req.body.position) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message:"Employee position is required."
            });
        } else if (!req.body.department) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message:"Employee department is required."
            });
        } else if (!req.body.email) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message:"Employee email is required."
            });
        } else if (!req.body.phone) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message:"Employee phone is required."
            });
        } else if (req.body.branchId === undefined || req.body.branchId === null) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Employe branchId is required."
            });
        } else {
            const {name, position, department, email, phone, branchId} = req.body;

            const newEmployee: Employees = await employeeService.createEmployee({name, position, department, email, phone, branchId});
            res.status(HTTP_STATUS.CREATED).json({
                message: "Employee created successfully.",
                data: newEmployee,
            })
        }
    } catch (error: unknown) {
        next(error)
    }
};


/**
 * this will handle the request to update the employee
 * @param req express request object
 * @param res express response object
 * @param next to pass errors 
 * the id will find the employee from the list and update it,
 * if it didnt find the error it will throw error
 */
export const updateEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        if (Number.isNaN(req.params.id)) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({
                    message:"Invalid ID number"
                });
            } else if (!req.body.name) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({
                    message:"Employee name is required"
                });
            } else if (!req.body.position) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({
                    message:"Employee position is required"
                });
            } else if (!req.body.department) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({
                    message:"Employee department is required"
                });
            } else if (!req.body.email) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({
                    message:"Employee email is required"
                });
            } else if (!req.body.phone) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({
                    message:"Employee phone is required"
                });
            } else if (req.body.branchId === undefined || req.body.branchId === null) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({
                    message: "Employee branchId is required"
                });
            } else {
 

        
                const id: number = Number(req.params.id);
                const { name, position, department, email, phone, branchId } = req.body;
                const updatedEmployee: Employees = await employeeService.updateEmployee(id, { name, position, department, email, phone, branchId });

                
                res.status(HTTP_STATUS.OK).json({
                    message: "Employee data updated successfully",
                    data: updatedEmployee,
                });
            }
         } catch (error: unknown) {
                next(error);
    };
};

/**
 * this will handle requestto delete the employee.
 * @param req express request object
 * @param res express response object
 * @param next to pass errors
 */

export const deleteEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const id: string = req.params.id;

        await employeeService.deleteEmployee(Number(id));
        res.status(HTTP_STATUS.OK).json({
            message: "Employee data deleted successfully.",
        });
    } catch (error: unknown) {
        next(error);
    }
};
