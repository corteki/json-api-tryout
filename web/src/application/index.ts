import { Router } from "express";
import { ContentNegotiation } from "../core/validation/ContentNegotiation";
import { Api } from "./Api";

export const Application = Router();

Application.use("/api/v1", ContentNegotiation.manageIO, Api);