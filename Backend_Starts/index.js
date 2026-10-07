import dns from "dns";

dns.setServers(["8.8.8.8"]);

import "dotenv/config";
import app from "./src/app.js";
import connectDB from "./src/db/index.js";

const port = process.env.PORT || 3000;

await connectDB();

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});