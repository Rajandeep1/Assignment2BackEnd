import request, { Response } from "supertest";
import app from "../src/app";


describe("GET /api/v1/health", () => {
    it("should return heath status", async () => {
        const response: Response = await request(app).get("/api/v1/health");
        
        expect(response.body.status).toBe("OK");
        expect(response.body).toHaveProperty("uptime");
        expect(response.body).toHaveProperty("timestamp");
        expect(response.body).toHaveProperty("version");
    });
});