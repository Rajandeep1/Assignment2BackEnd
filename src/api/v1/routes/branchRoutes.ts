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
