import dotenv from "dotenv";

dotenv.config();

export const configuration = {
  web: {
    port: process.env.WEB_PORT ||  "5432"
  },
  db: {
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    port: process.env.DATABASE_PORT || "5432"
  }
}