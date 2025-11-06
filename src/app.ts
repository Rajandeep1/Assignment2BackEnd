import express, {Express, Request, Response } from "express";
import helmet from "helmet";
import dotenv from "dotenv";

// imported morgan 
import morgan from "morgan";
// this is the import from the employee routes file
import employeeRoutes from "./api/v1/routes/employeeRoutes"
// this is the import from the branch routes file
import branchRoutes from "./api/v1/routes/branchRoutes"
import { getHelmetConfig } from "../config/helmetConfig";

dotenv.config()
const app: Express = express();

// this is the health check interface for response

interface HealthCheckResponse {
    status: string;
    uptime: number;
    timestamp: string;
    version: string;
}

app.use(helmet());
app.use(helmet(getHelmetConfig()));
 


// Use morgan for HTTP request logging
app.use(morgan("combined"));
// Ensures that the incoming body is correctly parsed to JSON. otherwise req.body would be undefined
// post and put body will be empty if i dont write this.
app.use(express.json());

app.get("/", (_req: Request, res: Response ) => {
    res.send("hello world");
});

// adding endpoint
// http://localhost:3000/api/v1/health
app.get("/api/v1/health", (_req: Request, res: Response) => {
    const healthData: HealthCheckResponse = {
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0"
    };

    res.json(healthData)
});

// tied routes to main app
app.use("/api/v1/employees", employeeRoutes)
app.use("/api/v1/branches", branchRoutes)


export default app;