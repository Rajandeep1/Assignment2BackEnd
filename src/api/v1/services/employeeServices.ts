import { Employees  } from "../../../models/employeeModel";
import { employee } from "../../../data/employees";


/**
 *  this will get all emplloyees from data
 * @returns all employees
 */
export const getAllEmployees = async(): Promise<Employees[]> => {
    return structuredClone(employee);
};


e