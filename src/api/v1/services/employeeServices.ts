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


/**
 * updatemployee function will update the employee data
 * @param id this unique id will identify the employee to update the data
 * @param employeeData fields that will be updated
 * @returns Updated employee data
 * @throws error if id is not found
 */
export const updateEmployee = async (
    id: number,
    employeeData: Pick<Employees, "name" | "position" | "department" | "email" | "phone" | "branchId"> 
): Promise<Employees> => {
    const index: number = employee.findIndex((emp: Employees) => emp.id === id);

    if (index === -1) {
        throw new Error(`Employee with ID ${id} not found`)
    }

    employee[index] = {
        ...employee[index],
        ...employeeData
    };

    return structuredClone(employee[index]);


};