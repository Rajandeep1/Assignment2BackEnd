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

/**
 * @openapi
 * /employees:
 *   post:
 *     summary: Create a new employee
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - position
 *               - department
 *               - email
 *               - phone
 *               - branchId
 *             properties:
 *               name:
 *                 type: string
 *                 example: "kumar"
 *               position:
 *                 type: string
 *                 example: "teacher"
 *               department:
 *                 type: string
 *                 example: "business"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "kumar@example.com"
 *               phone:
 *                 type: string
 *                 example: "+1-204-555-0198"
 *               branchId:
 *                 type: string
 *                 example: "b12345"
 *     responses:
 *       201:
 *         description: Employee created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       400:
 *         description: Invalid input data
 *       409:
 *         description: Employee with this email already exists
 */

// router for create employee
router.post(
    "/",
    validateRequest(employeeSchemas.create),
    employeeController.createEmployee
);

/**
 * @openapi
 * /employees/{id}:
 *   put:
 *     summary: Update an existing employee
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Employee ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       200:
 *         description: Employee updated successfully
 *       404:
 *         description: Employee not found
 */
router.put(
  "/:id",
  validateRequest(employeeSchemas.update),
  employeeController.updateEmployee
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