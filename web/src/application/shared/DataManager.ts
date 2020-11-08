import { Request, Response, NextFunction } from "express";
import { validationResult, ValidationChain } from "express-validator";

export class DataManager {
  static validate(validations: Array<ValidationChain>) {
    return async (req: Request, res: Response, next: NextFunction) => {
      await Promise.all(validations.map(validation => validation.run(req)));
  
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        return next();
      }
  
      return res.status(400).json({ errors: errors.array() });
    };
  }
}