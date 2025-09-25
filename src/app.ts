import express, { Express, Request, Response } from "express";
// Importing morgan
import morgan from "morgan";

// Use morgan for HTTP request logging


const app: Express = express();

interface HealthCheckResponse {
    status: string;
    uptime: number;
    timestamp: string;
    version: string;
}


// Use morgan for HTTP request logging
app.use(morgan("combined"));

app.use(express.json());


app.get("/", (req: Request, res: Response ) => {
    res.send("hello world");
});

// adding endpoint
// http://localhost:3000/api/v1/health
app.get("/api/v1/health", (req: Request, res: Response) => {
    const healthData: HealthCheckResponse = {
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    };

    res.json(healthData)
});

export default app;