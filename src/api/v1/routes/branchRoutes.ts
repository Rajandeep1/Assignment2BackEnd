import express, { Router  } from "express";
import * as branchController from "../controllers/branchController";
import { validateRequest } from "../middleware/validate";
import { branchSchemas} from "../validation/branchValidation";

const router: Router = express.Router();
// router for get all branches
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
