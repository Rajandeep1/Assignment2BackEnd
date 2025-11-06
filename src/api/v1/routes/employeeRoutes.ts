import express, { Router  } from "express";
import * as employeeController from "../controllers/employeeController";
import { validateRequest } from "../middleware/validate";
import { employeeSchemas } from "../validation/employeeValidation";


const router: Router = express.Router();

/**
 * @openapi
 * /employees:
 *   get:
 *     summary: Retrieves a list of employees
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of employees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employee'
 */

router.get("/",
    validateRequest(employeeSchemas.getAll),
    employeeController.getAllEmployees
);

// router for create employee
router.post(
    "/",
    validateRequest(employeeSchemas.create),
    employeeController.createEmployee
);

// router for update employee
router.put("/:id",
    validateRequest(employeeSchemas.update),
    employeeController.updateEmployee
);

// router for delete employees
router.delete("/:id",
    validateRequest(employeeSchemas.delete),
    employeeController.deleteEmployee
);

export default router;