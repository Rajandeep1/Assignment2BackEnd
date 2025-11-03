import { Employees  } from "../../../models/employeeModel";

import {
    QuerySnapshot,
    DocumentData,
    DocumentSnapshot,
} from "firebase-admin/firestore";
import {
createDocument,
getDocuments,
getDocumentById,
updateDocument,
deleteDocument,
} from "../Repositories/firestoreRepositories";

const COLLECTION: string = "employees";

/**
 *  this will get all emplloyees from data
 * @returns all employees
 */
export const getAllEmployees = async(): Promise<Employees[]> => {
    try{
    const snapshot: QuerySnapshot = await getDocuments(COLLECTION);
    const employee: Employees[] = snapshot.docs.map((doc) => {
        const data: DocumentData = doc.data();
        return {
            id: doc.id,
            ...data,
        } as Employees
    })
        return structuredClone(employee);
    } catch (error:unknown){
        throw error;
    }
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
     try {
        const newEmployee: Partial<Employees> = {
            ...createdEmployee,
        };
        const employeeId: string = await createDocument<Employees>(
            COLLECTION,
            newEmployee
        );
        return structuredClone({id:employeeId, ...newEmployee} as Employees);
    } catch (error:unknown){
        throw error;
    }


};

// 
/**
 * gets employee by id
 * @param id - if of the employee
 */
export const getEmployeeById =  async (id:string): Promise<Employees> => {
try {
        const doc: DocumentSnapshot | null = await getDocumentById(
            COLLECTION,
            id
        );

        if (!doc) {
            throw new Error(`Employee with ID ${id} not found`);
        }

        const data: DocumentData | undefined = doc.data();
        const employeebyId: Employees = {
            id: doc.id,
            ...data,
        } as Employees;

        return structuredClone(employeebyId);
    } catch (error: unknown) {
        throw error;
    }
};


/**
 * updatemployee function will update the employee data
 * @param id this unique id will identify the employee to update the data
 * @param employeeData fields that will be updated
 * @returns Updated employee data
 * @throws error if id is not found
 * 
 */
export const updateEmployee = async (
    id: string,
    employeeData: Pick<Employees, "name" | "position" | "department" | "email" | "phone" | "branchId"> 
): Promise<Employees> => {
       try{
        const employees: Employees = await getEmployeeById(id);
        if(!employees) {
            throw new Error(`Employee with ${id} is not found`)
        }

        const updateEmployee : Employees = {
            ...employees,
        };
        if (employeeData.name !== undefined) updateEmployee.name =  employeeData.name;
        if (employeeData.position !== undefined) updateEmployee.position =  employeeData.position;
        if (employeeData.department !== undefined) updateEmployee.department =  employeeData.department;
        if (employeeData.email !== undefined) updateEmployee.email =  employeeData.email;
        if (employeeData.phone !== undefined) updateEmployee.phone =  employeeData.phone;
        if (employeeData.branchId !== undefined) updateEmployee.branchId =  employeeData.branchId;

        await updateDocument<Employees>(COLLECTION, id, updateEmployee);

        return structuredClone(updateEmployee)
    }catch (error:unknown){
        throw error;
    }


};

/**
 * delete the employee from the list
 * @param id this will finf the id from list
 * @throws error if it didnt find the employee id
 */ 
export const deleteEmployee = async (id: string): Promise<void> => {
    try {
        const item: Employees = await getEmployeeById(id);
        if (!item) {
            throw new Error(`Item with ID ${id} not found`);
        }
        await deleteDocument(COLLECTION, id);
    } catch (error: unknown) {
        throw error;
    }
};