import { Request, Response, NextFunction } from "express";
import { validateRequest } from "../src/api/v1/middleware/validate";
import { employeeSchemas } from "../src/api/v1/validation/employeeValidation";
import { MiddlewareFunction } from "../src/api/v1/types/express";

describe("Validation Middleware", () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;

 
    beforeEach(() => {
        mockReq = {
            body: {},
            params: {},
            query: {},
        };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        mockNext = jest.fn();
    });
 
    it("should pass validtion for valid employee data", () => {
        // arrange
        mockReq.body = {
            name: "Krish",
            position: "Chef",
            department: "Food",
            email: "krish@gmail.com",
            phone: "999-999-0000",
            branchId: "1",
 
        };
 
        const middleware: MiddlewareFunction = validateRequest(
            employeeSchemas.create
        );
 
        // act
        middleware(mockReq as Request, mockRes as Response, mockNext);
 
        // assert
        expect(mockNext).toHaveBeenCalled();
        expect(mockRes.status).not.toHaveBeenCalled();
 
    });

});