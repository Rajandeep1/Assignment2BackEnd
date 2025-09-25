import { Branches } from "../../../models/branchModel";
import { branches } from "../../../data/branches";


/**
 * this wil get all the branches from the list of array.
 * @returns all branches
 */
export const getAllBranches = async(): Promise<Branches[]> => {
    return structuredClone(branches);
};