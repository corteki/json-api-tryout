import { Request, Response, NextFunction } from "express";

export class ContentNegotiation {

  static readonly SUPPORTED_CONTENT_TYPE = "application/vnd.api+json";
  static readonly SUPPORTED_ACCEPT_TYPE = "application/vnd.api+json"

  static manageIO(req: Request, res: Response, next: NextFunction) {
    const isValidContentType = req.headers["content-type"] === ContentNegotiation.SUPPORTED_CONTENT_TYPE;
    const isValidAcceptType = req.headers["accept"] === ContentNegotiation.SUPPORTED_ACCEPT_TYPE;
    if(isValidContentType && isValidAcceptType) {
      res.setHeader("Content-Type", ContentNegotiation.SUPPORTED_CONTENT_TYPE)
      next();
    } else if(!isValidContentType) {
      res.status(415);
      res.end();
    } else if(!isValidAcceptType) {
      res.status(406);
      res.end();
    }
  }
}
