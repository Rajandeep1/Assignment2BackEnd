import { Employees  } from "../../../models/employeeModel";
import { employee } from "../../../data/employees";


/**
 *  this will get all emplloyees from data
 * @returns all employees
 */
export const getAllEmployees = async(): Promise<Employees[]> => {
    return structuredClone(employee);
};


/**
 * 
 * @param createdEmployee this function will create a new employee using the given parameters
 * id: date,now() this will create the unique id for employee
 * @returns return the newly created employye to the end of array
 */

export const createEmployee = async (createdEmployee: {
    name: string;
    position: string;
    department: string;
    email: string;
    phone: string;
    branchId: number;
    }
): Promise<Employees> => {
    const newEmployee: Employees = {
        id: Date.now(),
        name: createdEmployee.name,
        position: createdEmployee.position,
        department: createdEmployee.department,
        email: createdEmployee.email,
        phone: createdEmployee.phone,
        branchId: createdEmployee.branchId,
    };

    // employee.push add the the new adata in the end of the array.
    employee.push(newEmployee)

    return structuredClone(newEmployee)


};