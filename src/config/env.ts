import * as dotenv from "dotenv";
dotenv.config();

const isDev = process.env.NODE_ENV === "development";

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT) || 4000,

  // Database (RDS)
  db: {
    host: process.env.RDS_HOST!,
    port: Number(process.env.RDS_PORT) || 5432,
    username: process.env.RDS_USER!,
    password: process.env.RDS_PASSWORD!,
    database: process.env.RDS_DB!,
  },

  // SSH tunnel config (for development only)
  ssh: {
    enabled: isDev && process.env.USE_SSH_TUNNEL !== "false",
    host: process.env.SSH_HOST!,               // Bastion/jump server
    port: Number(process.env.SSH_PORT) || 22,
    username: process.env.SSH_USERNAME!,
    keyPath: process.env.SSH_KEY_PATH!,        // path to .pem
    localPort: Number(process.env.SSH_LOCAL_PORT) || 5433, // local port for tunnel
    rdsEndpoint: process.env.RDS_HOST_DEV || process.env.RDS_HOST!,  // for dstAddr
  },
};