import "reflect-metadata";
import app from "./app.js";
import { dataSource } from "./config/database.js";
import { createDbTunnel } from "./config/dbTunnel.js";
import "dotenv/config";
const PORT = process.env.PORT || 4000;
async function start() {
    try {
        if (process.env.NODE_ENV === "development") {
            console.log("→ Creating SSH Tunnel...");
            await createDbTunnel(); // only for dev
        }
        await dataSource.initialize();
        console.log("→ Data Source initialized!");
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    }
    catch (err) {
        console.error("Startup error:", err);
        process.exit(1);
    }
}
start();
