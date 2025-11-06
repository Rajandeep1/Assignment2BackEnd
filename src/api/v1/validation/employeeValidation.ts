import Joi from "joi";

/**
 * @openapi
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - position
 *         - department
 *         - email
 *         - phone
 *         - branchId
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the employee
 *           example: "emp_001"
 *         name:
 *           type: string
 *           description: Full name of the employee
 *           example: "Kumar"
 *         position:
 *           type: string
 *           description: Employee's job position or title
 *           example: "business"
 *         department:
 *           type: string
 *           description: Department where the employee works
 *           example: "teacher"
 *         email:
 *           type: string
 *           format: email
 *           description: Employee’s official email address
 *           example: "kumar@example.com"
 *         phone:
 *           type: string
 *           description: Employee’s contact number
 *           example: "+1-111-999-0000"
 *         branchId:
 *           type: string
 *           description: The branch ID this employee belongs to
 *           example: "branch_001"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: When the employee record was created
 *           example: "2024-01-15T10:30:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: When the employee record was last updated
 *           example: "2024-01-20T14:45:00Z"
 */
 
/**
* Defines the Employee schema grouped by request category.
* Validates incoming data to ensure all mandatory fields are provided
* and conform to expected formats and business rules.
*/


export const employeeSchemas = {

    getAll: {
        query: Joi.object({
            page: Joi.number().integer().min(1).default(1),
            limit: Joi.number().integer().min(1).max(100).default(10),
        }),
    },
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
 