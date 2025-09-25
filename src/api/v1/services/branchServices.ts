import { Branches } from "../../../models/branchModel";
import { branches } from "../../../data/branches";


/**
 * this wil get all the branches from the list of array.
 * @returns all branches
 */
export const getAllBranches = async(): Promise<Branches[]> => {
    return structuredClone(branches);
};

/**
 * id: date.now() will create the unique id
 * @param newBranchData this function will create the new branch using the given parameters
 * @returns the newly created branch
 * 
 */

export const createBranch = async (branchCreated: {
    name: string;
    address: string;
    phone: string;
    }
): Promise<Branches> => {
    const newBranch: Branches = {
        id: Date.now(),
        name: branchCreated.name,
        address: branchCreated.address,
        phone: branchCreated.phone,
    };
    
    branches.push(newBranch)

    return structuredClone(newBranch)


};