import type { Branches } from "../../../models/branchModel";
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

const COLLECTION: string = "branches";
/**
 * gets all branches
 * @returns a full list of the branches
 */
export const getAllBranches = async(): Promise<Branches[]> => {
try{
    const snapshot: QuerySnapshot = await getDocuments(COLLECTION);
    const branches: Branches[] = snapshot.docs.map((doc) => {
        const data: DocumentData = doc.data();
        return {
            id: doc.id,
            ...data,
        } as Branches
    })
        return structuredClone(branches);
    } catch (error:unknown){
        throw error;
    }
};

/**
 *  this is to create a new branch
 * @param newBranchData this is the information about the new branch
 * @returns this will return a new branch
 */
export const createBranch = async (newBranchData: {
    name: string;
    address: string;
    phone: string;
    }
): Promise<Branches> => {
    try {
        const newEmployee: Partial<Branches> = {
            ...newBranchData,
        };
        const employeeId: string = await createDocument<Branches>(
            COLLECTION,
            newEmployee
        );
        return structuredClone({id:employeeId, ...newEmployee} as Branches);
    } catch (error:unknown){
        throw error;
    }

};
/**
 * updates an branch
 * @param id the id of hte branch to update
 * @param branchData this is the fields to update
 * @returns the updates branch
 * @throws error if branch with given id is not found
 */
export const updateBranch = async (
    id: string,
    branchData: Pick<Branches, "name" | "address"| "phone"> 
): Promise<Branches> => {
try{
        const branch: Branches = await getBranchesById(id);
        if(!branch) {
            throw new Error(`Branches with ${id} is not found`)
        }

        const updateBranch : Branches = {
            ...branch,
        };
        if (branchData.name !== undefined) updateBranch.name =  branchData.name;
        if (branchData.address !== undefined) updateBranch.address =  branchData.address;
        if (branchData.phone !== undefined) updateBranch.phone =  branchData.phone;
        

        await updateDocument<Branches>(COLLECTION, id, updateBranch);

        return structuredClone(updateBranch)
    }catch (error:unknown){
        throw error;
    }
};
/**
 *get branch by id
 * @param id the id of the branch
 */
export const getBranchesById =  async (id:string): Promise<Branches> => {
try {
        const doc: DocumentSnapshot | null = await getDocumentById(
            COLLECTION,
            id
        );
        if (!doc) {
        throw new Error(`Branches with ID ${id} not found`);
        }

        const data: DocumentData | undefined = doc.data();
        const branchById: Branches = {
            id: doc.id,
            ...data,
        } as Branches;
        return structuredClone(branchById);
    } catch (error: unknown) {
        throw error;
    }
};

/**
 * this deletes the branch by id.
 * @param id this is the branch id number.
 * this finds the branch by id and removes it .
 * if the id is not found it throws a error.
 */
export const deleteBranch = async (id:string): Promise<void> => {
try {
        const item: Branches = await getBranchesById(id);
        if (!item) {
            throw new Error(`Branches with ID ${id} not found`);
        }
        await deleteDocument(COLLECTION, id);
    } catch (error: unknown) {
        throw error;
    }
};
