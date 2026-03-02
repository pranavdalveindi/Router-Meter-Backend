// src/config/dbTunnel.ts
import { createTunnel } from "tunnel-ssh";
import fs from "fs";
import { env } from "./env.js"; // your env wrapper
let tunnelServer = null;
let sshClient = null;
export async function createDbTunnel() {
    if (!env.ssh.enabled) {
        console.log("SSH tunnel disabled – connecting directly to DB");
        return;
    }
    const privateKey = fs.readFileSync(env.ssh.keyPath);
    const tunnelOptions = {
        autoClose: false,
        reconnectOnError: true,
    };
    const serverOptions = {
        port: env.ssh.localPort,
    };
    const forwardOptions = {
        srcAddr: "127.0.0.1",
        srcPort: env.ssh.localPort, // local port (5433)
        dstAddr: env.db.host, // ← RDS endpoint! (e.g. yourcluster.abc.rds.amazonaws.com)
        dstPort: env.db.port || 5432,
    };
    const sshOptions = {
        host: env.ssh.host,
        port: env.ssh.port,
        username: env.ssh.username,
        privateKey,
        keepaliveInterval: 30000,
    };
    console.log(`Creating SSH tunnel: local:${env.ssh.localPort} → ${env.ssh.host}:${env.ssh.port} via bastion`);
    try {
        [tunnelServer, sshClient] = await createTunnel(tunnelOptions, serverOptions, sshOptions, forwardOptions);
        console.log(`SSH tunnel established on local port ${env.ssh.localPort}`);
        // Cleanup on process termination
        process.on("SIGINT", closeTunnel);
        process.on("SIGTERM", closeTunnel);
        process.on("exit", closeTunnel);
    }
    catch (error) {
        console.error("Failed to create SSH tunnel:", error.message);
        throw error;
    }
}
function closeTunnel() {
    if (tunnelServer) {
        console.log("Closing local tunnel server...");
        tunnelServer.close();
        tunnelServer = null;
    }
    if (sshClient) {
        console.log("Ending SSH connection...");
        sshClient.end();
        sshClient = null;
    }
}
export function getLocalDbPort() {
    return env.ssh.enabled ? env.ssh.localPort : env.ssh.port;
}
export function getLocalDbHost() {
    return "127.0.0.1";
}
