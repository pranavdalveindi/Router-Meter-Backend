import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { env } from "./env.js";
import { getLocalDbHost, getLocalDbPort } from "./dbTunnel.js";
import { RouterEvent } from "../entities/RouterEvent.js";
import { User } from "../entities/user.entity.js";

const isDev = env.nodeEnv === "development";

// Production SSL config: verify server certificate
const sslConfig = isDev
  ? false // dev: no SSL verification
  : { rejectUnauthorized: true }; // prod: verify server cert

const baseConfig: DataSourceOptions = {
  type: "postgres",
  username: env.db.username,
  password: env.db.password,
  database: env.db.database,
  host: isDev ? getLocalDbHost() : env.db.host,
  port: isDev ? getLocalDbPort() : env.db.port,
  synchronize: false,
  logging: env.nodeEnv !== "production",

  entities: [RouterEvent, User],

  migrations: isDev
    ? ["src/migrations/**/*.ts"]
    : ["dist/migrations/**/*.js"],

  ssl: sslConfig,

  extra: {
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 30000,
  },
};

export const dataSource = new DataSource(baseConfig);