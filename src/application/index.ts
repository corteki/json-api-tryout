import { Router } from "express";
import { Api } from "./Api";

export const Application = Router();

Application.use("/api/v1", Api);