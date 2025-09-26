

import request from "supertest";
import app from "../src/app";
import * as employeeController from "../src/api/v1/controllers/employeeController";
import { HTTP_STATUS } from "../src/constants/httpConstants";



jest.mock("../src/api/v1/controllers/employeeController", () => ({
    getAllEmployees: jest.fn((_req, res) => res.status(HTTP_STATUS.OK).send()),
    createEmployee: jest.fn((_req, res) => res.status(HTTP_STATUS.CREATED).send()),
    updateEmployee: jest.fn((_req, res) => res.status(HTTP_STATUS.OK).send()),
    deleteEmployee: jest.fn((_req, res) => res.status(HTTP_STATUS.OK).send()),
}));


describe("Employee routes", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    // Test for fetching all the employees
    describe("GET /api/v1/employees/", () => {
        it("should call getAallEmployees controller", async () => {
            await request(app).get("/api/v1/employees/");
            expect(employeeController.getAllEmployees).toHaveBeenCalled();
        });
    });

    // Test for creating a new employee
    describe("POST /api/v1/employees/", () => {
        it("should call createEmployee controller", async () => {
            const mockbody = {
                name: "Linda Martinez",
                position:"Financial Advisor",
                department: "Advisory",
                email:"linda.martinez@pixell-river.com",
                phone:"780-555-0165",
                branchId: 2,
            };
            await request(app).post("/api/v1/employees/").send(mockbody);
            expect(employeeController.createEmployee).toHaveBeenCalled();
        });
    });

    // Test for updating an existing employee
    describe("PUT /api/v1/employees/", () => {
        it("should call update controller", async () => {
            const body = {
                name: "Linda Martinez",
                position:"Financial Advisor",
                department: "Advisory",
                email:"linda.martinez@pixell-river.com",
                phone:"780-555-0165",
                branchId: 2,
            };
            await request(app).put("/api/v1/employees/testemployees").send(body);
            expect(employeeController.updateEmployee).toHaveBeenCalled();
        });
    });

    // Test for removing an employee
    describe("DELETE /api/v1/employees/", () => {
        it("should call deleteEmployee controller", async () => {
            await request(app).delete("/api/v1/employees/testemployees");
            expect(employeeController.deleteEmployee).toHaveBeenCalled();
        });
    });
});