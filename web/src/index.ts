import "reflect-metadata";
import express from "express";
import logger from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import path from "path";
import { Application } from "./application";
import { createConnection } from "typeorm";
import { ContentNegotiation } from "./core/validation/ContentNegotiation";

export const app = express();

const bootstrap = async () => {
  app.use(bodyParser.json({type: ContentNegotiation.SUPPORTED_CONTENT_TYPE}));
  app.use(logger('dev'));
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, '../public')))
  app.use(Application);
}

createConnection().then(async () => {
  await bootstrap()
}).catch(error => console.log(error))