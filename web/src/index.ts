import "reflect-metadata";
import express from "express";
import { createConnection } from "typeorm";
import { bootstrap } from "./Bootstrap";

export const app = express();

createConnection().then(bootstrap(app)).catch(error => console.log(error));
