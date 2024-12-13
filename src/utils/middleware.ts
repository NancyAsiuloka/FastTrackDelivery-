import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";

export class AuthMiddleware {

  private extractToken(req: Request): string | null {
    const authorizationHeader = req.headers.authorization;
    if (authorizationHeader && authorizationHeader.startsWith("Bearer ")) {
      return authorizationHeader.split(" ")[1];
    }
    return null;
  }

  public async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    const token = this.extractToken(req);

    if (!token) {
      res.status(httpStatus.FORBIDDEN).json({ message: "Access denied. No token provided." });
      return;
    }

    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY as string);
      (req as any).user = decoded;
      next();
    } catch (error: any) {
      console.error("Token verification failed", error.stack);
      this.handleTokenError(error, res);
    }
  }

  private handleTokenError(error: any, res: Response): void {
    switch (error.name) {
      case "TokenExpiredError":
        res.status(httpStatus.UNAUTHORIZED).json({ message: "Token expired." });
        return;
      case "JsonWebTokenError":
        res.status(httpStatus.UNAUTHORIZED).json({ message: "Invalid token." });
        return;
      default:
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: "Token verification failed." });
        return;
    }
  }
}
