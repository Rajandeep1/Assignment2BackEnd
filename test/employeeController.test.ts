import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../src/constants/httpConstants";
import * as employeeController from "../src/api/v1/controllers/employeeController";
import * as employeeService from "../src/api/v1/services/employeeServices";
import { Employees } from "../src/models/employeeModel";

 
jest.mock("../src/api/v1/services/employeeServices");

describe("employee Controller", () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;

    // Setup reusable mocks before each test
    beforeEach(() => {
        jest.clearAllMocks();
        mockReq = { params: {}, body: {} };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        mockNext = jest.fn();
    });

    // Test to get all employees
    describe("getAllEmployees", () => {
        it("it should handle sucessful operation", async () => {
            const mockEmployees: Employees[] = [
                {
                    id: 12,
                    name: "Jennifer Harris",
                    position: "Branch Manager",
                    department: "Management",
                    email: "jennifer.harris@pixell-river.com",
                    phone: "204-555-0252",
                    branchId: 6,
                },
            ];
            (employeeService.getAllEmployees as jest.Mock).mockReturnValue(mockEmployees);

            await employeeController.getAllEmployees(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "employees information retrieved sucessfully",
                data: mockEmployees,
            });
        });
    });

    // Test for creating an employee
    describe("createEmployee", () => {
        it("should handle successful creation", async () => {
            const mockBody = {
                    name: "Jennifer Harris",
                    position: "Branch Manager",
                    department: "Management",
                    email: "jennifer.harris@pixell-river.com",
                    phone: "204-555-0252",
                    branchId: 6,
            };

            const mockEmployees: Employees = {
                id: 2,
                ...mockBody,
            };

            mockReq.body = mockBody;
            (employeeService.createEmployee as jest.Mock).mockReturnValue(mockEmployees);

            await employeeController.createEmployee(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.CREATED);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Employee created successfully.",
                data: mockEmployees,
            });
        });

        // 
        it("should return 400 when name is missing", async () => {
            mockReq.body = {
                    position: "Branch Manager",
                    department: "Management",
                    email: "jennifer.harris@pixell-river.com",
                    phone: "204-555-0252",
                    branchId: 6,
            };
            await employeeController.createEmployee(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Employee name is required.",
            });
        });
    });

    // Test for updating an employee
    describe("updateEmployee", () => {
        it("should handle successful updates", async () => {
            mockReq.params = { id: "123" };
            const Body = {
                    name: "Jennifer Harris",
                    position: "Branch Manager",
                    department: "Management",
                    email: "jennifer.harris@pixell-river.com",
                    phone: "204-555-0252",
                    branchId: 6,
            };

            const mockEmployees: Employees = {
                id: 123,
                ...Body,
            };

            mockReq.body = Body;
            (employeeService.updateEmployee as jest.Mock).mockReturnValue(mockEmployees);

            await employeeController.updateEmployee(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Employee data updated successfully",
                data: mockEmployees,
            });
        });

        // 
        it("should return 400 when name is missing", async () => {
            mockReq.params = { id: "123" };
            mockReq.body = {
                    position: "Branch Manager",
                    department: "Management",
                    email: "jennifer.harris@pixell-river.com",
                    phone: "204-555-0252",
                    branchId: 6,
            };
            await employeeController.updateEmployee(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Employee name is required",
            });
        });
    });

    // Test for Delete employee
    describe("deleteEmployee", () => {
                    it("should handle successful deletion", async () => {
                    mockReq.params = { id: "123" };
                    (employeeService.deleteEmployee as jest.Mock).mockResolvedValue(undefined);
    
                await employeeController.deleteEmployee(
                mockReq as Request,
                mockRes as Response,
                mockNext
                );
    
                expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
                expect(mockRes.json).toHaveBeenCalledWith({
                message: "Employee data deleted successfully.",
            });
        });
    });
    
});
