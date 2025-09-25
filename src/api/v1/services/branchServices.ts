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

/**
 * 
 * @param id this will find the id to update the branch
 * @param branchData this will update the fields of branch
 * @returns 
 */

export const updateBranch = async (
    id: number,
    branchData: Pick<Branches, "name" | "address"| "phone"> 
): Promise<Branches> => {
    const index: number = branches.findIndex((branch: Branches) => branch.id === id);

    if (index === -1) {
        throw new Error(`Branch with ID ${id} is not found`)
    }

    branches[index] = {
        ...branches[index],
        ...branchData
    };

    return structuredClone(branches[index]);


};


/**
 * this function will delete the branch
 * @param id this will find the branch by id
 * after finding the branch, it will delete the branch
 * @throws error if branch id does not exist
 */
export const deleteBranch = async (id:number): Promise<void> => {
    const index: number = branches.findIndex((b: Branches) => b.id === id);

    if (index === -1) {
        throw new Error(`Branch with ID ${id} not found`)
    }

    branches.splice(index,1);
};