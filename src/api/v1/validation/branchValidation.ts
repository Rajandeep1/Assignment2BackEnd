import Joi from "joi";

 /**
 * @openapi
 * components:
 *   schemas:
 *     Branch:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - address
 *         - phone
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the branch
 *           example: "branch_001"
 *         name:
 *           type: string
 *           description: Name of the branch
 *           example: "Downtown Branch"
 *         address:
 *           type: string
 *           description: Full address of the branch
 *           example: "123 Main Street, Winnipeg, MB"
 *         phone:
 *           type: string
 *           description: Contact phone number of the branch
 *           example: "+1-111-999-0000"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: When the branch record was created
 *           example: "2024-01-15T10:30:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: When the branch record was last updated
 *           example: "2024-01-20T14:45:00Z"
 */
export const branchSchemas = {

    
    getAll: {
        query: Joi.object({
            page: Joi.number().integer().min(1).default(1),
            limit: Joi.number().integer().min(1).max(100).default(10),
        }),
    },
 
    create: {
        body: Joi.object({
 
        name: Joi.string().required().messages({
            "any.required": "Name is required",
            "string.empty": "Name cannot be empty",
        }),
       
        address: Joi.string().required().messages({
            "any.required": "Address is required",
            "string.empty": "Address cannot be empty",
        }),
       
        phone: Joi.string().required().messages({
            "any.required": "Phone number is required",
            "string.empty": "Phone number cannot be empty",
        }),
    }),  
 
    },
 
   update: {
       params: Joi.object({
           id: Joi.string().required().messages({
               "any.required": "Branch ID is required",
               "string.empty": "Branch ID cannot be empty",
           }),
       }),
       body: Joi.object({
               name: Joi.string().optional().messages({
                   "string.empty": "Name cannot be empty",
               }),
               address: Joi.string().optional().messages({
                   "string.empty": "address cannot be empty",
               }),
               phone: Joi.string().optional().messages({
                   "string.empty": "phone cannot be empty",
               }),
                 
                       
           }),
    },
 
 
     
    delete: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Branch ID is required",
                "string.empty": "Branch ID cannot be empty",
            }),
        }),
    },
};
 