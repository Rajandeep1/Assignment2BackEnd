import Joi from "joi";
 
/**
* Defines the Employee schema grouped by request category.
* Validates incoming data to ensure all mandatory fields are provided
* and conform to expected formats and business rules.
*/

 
export const employeeSchemas = {
    // POST /api/v1/routes - Create new employees
    create: {
        body: Joi.object({
 
            name: Joi.string().required().messages({
                "any.required": "Name is required",
                "string.empty": "Name cannot be empty",
            }),

            position: Joi.string().required().messages({
                "any.required": "Position is required",
                "string.empty": "Position cannot be empty",
            }),
 
            department: Joi.string().required().messages({
                "any.required": "Department is required",
                "string.empty": "Department cannot be empty",
            }),
 
            
            email: Joi.string().required().messages({
                "any.required": "Email is required",
                "string.empty": "Email cannot be empty",
            }),
 
            phone: Joi.string().required().messages({
                "any.required": "Phone is required",
                "string.empty": "Phone cannot be empty",
            }),
 
            
            branchId: Joi.string().required().messages({
                "any.required": "branchId is required",
                "string.empty": "branchId cannot be empty",
            }),
        }),
    },
 
    
update: {
    params: Joi.object({
        id: Joi.string().required().messages({
            "any.required": "Employee ID is required",
            "string.empty": "Employee ID cannot be empty",
        }),
    }),
    body: Joi.object({
            name: Joi.string().optional().messages({
                "string.empty": "Name cannot be empty",
            }),
            position: Joi.string().optional().messages({
                "string.empty": "Position cannot be empty",
            }),
            department: Joi.string().optional().messages({
                "string.empty": "Department cannot be empty",
            }),
            email: Joi.string().optional().messages({
                "string.empty": "Email cannot be empty",
            }),
            phone: Joi.string().optional().messages({
                "string.empty": "Phone cannot be empty",
            }),
            branchId: Joi.string().optional().messages({
                "string.empty": "BranchId cannot be empty",
            }),    
                   
        }),    
    },
 
    delete: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Employee ID is required",
                "string.empty": "Employee ID cannot be empty",
            }),
        }),
    },
 
};
 