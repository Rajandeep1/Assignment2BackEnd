import { Request, Response, NextFunction } from "express";
import { validateRequest } from "../src/api/v1/middleware/validate";
import { branchSchemas } from "../src/api/v1/validation/branchValidation";
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
 
    it("should pass validation for valid branch create data", () => {
    // arrange
    mockReq.body = {
        name: "I.T",
        address: "Alexander College",
        phone: "666-777-9990"
    };
 
    const middleware: MiddlewareFunction = validateRequest(
        branchSchemas.create
    );
 
    // act
    middleware(mockReq as Request, mockRes as Response, mockNext);
 
    // assert
    expect(mockNext).toHaveBeenCalled();
    expect(mockRes.status).not.toHaveBeenCalled();
 
    });
});
 