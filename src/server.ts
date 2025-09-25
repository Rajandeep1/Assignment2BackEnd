import app from "./app";

import { Server } from "http";

// initialized a PORT as string from the .env or 3000 default
const PORT: string | 3000 = process.env.PORT || 3000;

// initilized the server for the express application for request on port
const server: Server = app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`);
});

export default server;