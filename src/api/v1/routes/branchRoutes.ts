import express, { Router  } from "express";
import * as branchController from "../controllers/branchController";
import { validateRequest } from "../middleware/validate";
import { branchSchemas} from "../validation/branchValidation";


////chnges made

const router: Router = express.Router();

/**
 * @openapi
 * /branches:
 *   get:
 *     summary: Retrieves a list of branches
 *     tags: [Branches]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of branches
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Branch'
 */

router.get("/",
    validateRequest(branchSchemas.getAll), 
    branchController.getAllBranches
);

// router for create branch
/**
 * @openapi
 * /branches:
 *   post:
 *     summary: Create a new branch
 *     tags: [Branches]
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
 *               - address
 *               - phone
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Downtown Branch"
 *               address:
 *                 type: string
 *                 example: "123 Main Street, Winnipeg, MB"
 *               phone:
 *                 type: string
 *                 example: "+1-111-999-0000"
 *     responses:
 *       201:
 *         description: Branch created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Branch'
 *       400:
 *         description: Invalid input data
 *       409:
 *         description: Branch with this name already exists
 */

router.post("/", 
    validateRequest(branchSchemas.create),
    branchController.createBranch
);

// router for update branches
router.put("/:id",
    validateRequest(branchSchemas.update), 
    branchController.updateBranch
);

// router for delete branch
router.delete("/:id",
    validateRequest(branchSchemas.delete),
    branchController.deleteBranch
);

export default router;
