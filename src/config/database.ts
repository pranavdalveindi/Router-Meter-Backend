import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { env } from "./env.js";
import fs from "fs";
import { getLocalDbHost, getLocalDbPort } from "./dbTunnel.js";
import { RouterEvent } from "../entities/RouterEvent.js";
import { User } from "../entities/user.entity.js";


const isDev = env.nodeEnv === "development";

const baseConfig: DataSourceOptions = {
  type: "postgres", // ✅ now correctly typed
  username: env.db.username,
  password: env.db.password,
  database: env.db.database,
  synchronize: false,
  logging: env.nodeEnv !== "production",

  entities: [RouterEvent, User],

  migrations: isDev
    ? ["src/migrations/**/*.ts"]
    : ["dist/migrations/**/*.js"],

  ssl: {
    ca: fs.readFileSync("global-bundle.pem").toString(),
    rejectUnauthorized: !isDev,
  },

  extra: {
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 30000,
  },
};

export const dataSource = new DataSource({
  ...baseConfig,
  host: isDev ? getLocalDbHost() : env.db.host,
  port: isDev ? getLocalDbPort() : env.db.port,
});