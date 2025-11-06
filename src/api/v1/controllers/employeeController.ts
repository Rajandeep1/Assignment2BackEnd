import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as employeeService from "../services/employeeServices";
import { Employees } from "../../../models/employeeModel";
import { successResponse } from "../../../models/responseModel"



/**
 * Get all employees
 * @param req - the express request
 * @param res - the express response
 * @param next - the express middleware chaining function
 */

export const getAllEmployees = async (
    _req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const employee: Employees[] = await employeeService.getAllEmployees();
        res.status(HTTP_STATUS.OK).json(
            successResponse(employee, "employees sucessfully retireved")
        );
    } catch (error: unknown) {
        next(error)
    }

};

/**
 * Manages the requests, responses, and the validation to create a new employee
 * @param req the express request
 * @param res the express response
 * @param next the express middleware chaining function
 */
export const createEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try{
            // extracting all of the fields (destructuring)
            const {name, position, department, email, phone, branchId} = req.body;

            const newEmployee: Employees = await employeeService.createEmployee({name, position, department, email, phone, branchId});
            res.status(HTTP_STATUS.CREATED).json(
                successResponse(newEmployee, "Employee created successfully")
            );
    }catch (error: unknown) {
        next(error);
    }
};

// update an employees

/**
 * update employees
 * @param req - the express request
 * @param res - the express response
 * @param next - the express middleware chaining function
 */

export const updateEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try{
        
            const {id} = req.params;
            // extracting all of the fields (destructuring)
            const {name, position, department, email, phone, branchId} = req.body;

            const updatedEmployee: Employees = await employeeService.updateEmployee(id ,{name, position, department, email, phone, branchId});
            res.status(HTTP_STATUS.OK).json(
                successResponse( updatedEmployee , "Employee updated successfully")
            );
    } catch (error: unknown) {
        next(error);
    }
};




/**
 * delete employees
 * @param req - the express request
 * @param res - the express response
 * @param next - the express middleware chaining function
 */


export const deleteEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const {id} = req.params;

        await employeeService.deleteEmployee(id);
        res.status(HTTP_STATUS.OK).json(
            successResponse("employee deleted successfully")
        );
    } catch (error: unknown) {
        next(error);
    }
};