import Joi from "joi";
 
export const branchSchemas = {
 
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
 