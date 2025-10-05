import request from "supertest";
import app from "../src/app";
import * as branchController from "../src/api/v1/controllers/branchController";
import { HTTP_STATUS } from "../src/constants/httpConstants";




jest.mock("../src/api/v1/controllers/branchController", () => ({
    getAllBranches:jest.fn((_req, res) => res.status(HTTP_STATUS.OK).send()),
    createBranch:jest.fn((_req, res) => res.status(HTTP_STATUS.CREATED).send()),
    updateBranch:jest.fn((_req, res) => res.status(HTTP_STATUS.OK).send()),
    deleteBranch:jest.fn((_req, res) => res.status(HTTP_STATUS.OK).send()),
}));

describe("Employee routes", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    // test to get all branches
    describe("GET /api/v1/branch/", () => {
        it("should call getAallEmployees controller", async () => {
            await request(app).get("/api/v1/branches/");
            expect(branchController.getAllBranches).toHaveBeenCalled();
        });
    });
    
    
    // test for creating a branch with valid data
    describe("POST /api/v1/branch/", () => {
        it("should call createbranch controller", async () => {
            const body = {
                name: "laj",
                address: "1790 Henderson Highway",
                phone: "431-277-7474",

            };
            await request(app).post("/api/v1/branches/").send(body);
            expect(branchController.createBranch).toHaveBeenCalled();
        });
    });

    
    // test for updating branches
    // test to create a branch with valid data
    describe("POST /api/v1/branch/:id", () => {
        it("should call update controller", async () => {
            const mockbody = {
                name: "laj",
                address: "1790 Henderson Highway",
                phone: "431-277-7474",

            };
            await request(app).put("/api/v1/branches/123").send(mockbody);
            expect(branchController.updateBranch).toHaveBeenCalled();
        });
    });


    // test for deleting branches
    describe("DELETE /api/v1/branch/:id", () => {
        it("should call deleteEmployee controller", async () => {
            await request(app).delete("/api/v1/branches/123");
            expect(branchController.deleteBranch).toHaveBeenCalled();
        });
    });

});
